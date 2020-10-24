import {AHCharacter} from "./AHCharacter";

export interface TokenSpec {
    value: number,
    count: number,
    name: string,
    chaos: boolean
}
export type EffectSpec = (tokenBag: TokenBag) => number;

export interface Token extends TokenSpec {
    effect: EffectSpec;
}

export function tokenSpecDef(value: number, count: number, chaos = false, name?: string): TokenSpec {
    return {
        value, count, chaos,
        name: name ?? "Token" + value,
    }
}

function copyTokenSpec(tokenSpec: TokenSpec): TokenSpec {
    return {
        ...tokenSpec
    }
}

function decCount(t: Token) {
    return {...t, count: t.count - 1};
}

export interface TokenBagSpec {
    tokens: TokenSpec[];
}

function findName(tokenBagSpec: TokenBagSpec, name: string): TokenSpec | undefined {
    return tokenBagSpec.tokens.find(t => t.name === name);
}

export function removeToken(tokenBagSpec: TokenBagSpec, tokenName: string): TokenBagSpec {
    const newBag = {
        tokens: tokenBagSpec.tokens.map(ts => copyTokenSpec(ts))
    }
    const tokenSpecInBag = findName(newBag, tokenName);
    if (tokenSpecInBag) {
        tokenSpecInBag.count-=1;
    }
    newBag.tokens = newBag.tokens.filter(ts => ts.count === 0);
    return newBag;
}

export function addTokens(tokenBagSpec: TokenBagSpec, ...tokens: TokenSpec[]): TokenBagSpec {
    const newBag = {
        tokens: tokenBagSpec.tokens.map(ts => copyTokenSpec(ts))
    }
    tokens.forEach(tokenSpec => {
        const tokenSpecInBag = findName(newBag, tokenSpec.name);
        if (tokenSpecInBag) {
            tokenSpecInBag.count += tokenSpec.count
        } else {
            newBag.tokens.push(tokenSpec);
        }
    })
    return newBag;
}


export function buildBagSpec(...tokens: TokenSpec[]): TokenBagSpec {
    return {tokens}
}

export function allTokenSpecs(bagSpec: TokenBagSpec): TokenSpec[] {
    const allTokensIndividually: TokenSpec[] = [];
    bagSpec.tokens.forEach( t => {
        for(let i = 0; i < t.count; i++) allTokensIndividually.push({...t, count: 1});
    })
    return allTokensIndividually;
}

export type ScenarioContext = { [key: string]: number };

export interface TokenBag {
    context: ScenarioContext;
    character: AHCharacter;
    tokens: Token[];
}

export type ScenarioEffectSpecs = { name: string, effect: EffectSpec }[];

export function buildEffectSpecs(...effectSpecs: ScenarioEffectSpecs): Map<string, EffectSpec> {
    const effectMap = new Map<string, EffectSpec>();
    effectSpecs.forEach( ns => effectMap.set(ns.name, ns.effect));
    return effectMap;
}

export function buildBagFromSpec(bagSpec: TokenBagSpec, effects: Map<string, EffectSpec>, character: AHCharacter, context: ScenarioContext): TokenBag {
    return {
        character,
        context,
        tokens: bagSpec.tokens.map(tokenSpec => tokenDef(tokenSpec, effects.get(tokenSpec.name)))
    }
}



export function tokenDef(tokenSpec: TokenSpec, effect?: EffectSpec): Token {
    return {
        ...tokenSpec,
        effect: effect ?? (() => tokenSpec.value),
    }
}

const FALLO_AUTOMATICO_VALUE = -99

export const FALLO_AUTOMATICO = tokenSpecDef(FALLO_AUTOMATICO_VALUE, 1, true, "Fallo");

function sortTokens(tokenBag: TokenBag) {
    return tokenBag.tokens.sort((a, b) => b.effect(tokenBag) - a.effect(tokenBag));
}

export function tokenAverage(tokenBag: TokenBag): number {
    const tokens = tokenBag.tokens;
    let numOfTokens = 0;
    const total = tokens.reduce<number>((sum, token) => {
        if (token.value !== FALLO_AUTOMATICO_VALUE) {
            numOfTokens += token.count;
            return sum + (token.effect(tokenBag) * token.count)
        } else {
            return sum;
        }
    },0);
    return Math.floor(total / numOfTokens);
}

interface ValueCount {
    value: number;
    count: number;
}

export function histogram(tokenBag: TokenBag) {
    return sortTokens(tokenBag).reduce<ValueCount[]>((previousValues: ValueCount[], token: Token) => {
        const last = previousValues.length >= 1 ? previousValues[previousValues.length - 1] : undefined;
        if (last && last.value === token.effect(tokenBag)) {
            last.count = last.count + token.count;
        } else {
            previousValues.push({value: token.effect(tokenBag), count: token.count});
        }
        return previousValues;
    }, []);
}

export function accumulated(tokenBag: TokenBag) {
    return histogram(tokenBag).reduce<ValueCount[]>((prev, curr: ValueCount) => {
        const prevValue = prev.length > 0 ? prev[prev.length - 1].count : 0;
        return prev.concat({value: curr.value, count: curr.count + prevValue});
    }, []);
}



export function sealAll(tokenBag: TokenBag, tokenName: string): TokenBag {
    const tokensFiltered: Token[] = tokenBag.tokens.map(t => {
        return t.name !== tokenName ? t : null
    }).filter(t => t !== null) as Token[];
    return {
        ...tokenBag,
        tokens: tokensFiltered,
    }
}

export function seal(tokenBag: TokenBag, tokenName: string): TokenBag {
    const tokensFiltered = tokenBag.tokens.map(t => {
        return t.name !== tokenName ? t : decCount(t)
    }).filter(t => t.count > 0)
    return {
        ...tokenBag,
        tokens: tokensFiltered
    }
}

export function allTokens(bag: TokenBag): Token[] {
    const allTokensIndividually: Token[] = [];
    bag.tokens.forEach( t => {
        for(let i = 0; i < t.count; i++) allTokensIndividually.push({...t, count: 1});
    })
    return allTokensIndividually;
}


// TokenBagPassZone
export interface WithTokenBag {
    tokenBag: TokenBag;
}
export type TokenBagPassZone = Map<number, number> & WithTokenBag;
export function tokenBagPassZone(tokenBag: TokenBag): TokenBagPassZone {
    const accum = accumulated(tokenBag);
    const map = new Map<number, number>() as TokenBagPassZone;
    map.tokenBag = tokenBag;
    const total = accum[accum.length - 1].count;
    accum.forEach(vc => {
        vc.value !== FALLO_AUTOMATICO_VALUE && map.set(vc.value, 100 * vc.count / total);
    });
    return map;
}

export interface ISkillLine {
    key: number;
    prob: number;
    pass: boolean;
    firstFail: boolean;
    currentProb: boolean;
}

export function bagSkillLines(tokenBagMap: TokenBagPassZone, skill: number, test: number): ISkillLine[] {
    const lines: ISkillLine[] = [];
    let stillPass = true;
    tokenBagMap.forEach((value, key) => {
        const result = Math.max(skill+key, 0);
        const pass = result >= test;
        const nextPass = Math.max(result -1, 0) >= test;
        const currentProb = pass && !nextPass;
        const firstFail = !pass && stillPass;
        stillPass = pass;
        lines.push({
            key,
            prob: value,
            pass,
            firstFail,
            currentProb
        });
    });
    return lines;
}

export function printSkillLine(tokenBagMap: TokenBagPassZone, skill: number, test: number): string {
    let output = "";
    output+="******************\n";
    output+=`Skill: ${skill}, Test: ${test}\n`;
    output+="******************\n";
    const lines = bagSkillLines(tokenBagMap, skill, test);
    lines.forEach(line => {
        const keyFormat = line.key.toString().padStart(2, " ");
        if (line.firstFail) {
            output+="------------------\n";
        }
        output+=`${keyFormat} => ${line.prob.toFixed(2)}% ${line.currentProb ? "<----":""}\n`;
    });
    output+="******************\n";
    return output;
}

export function nnDec(nn: number): number {
    return Math.max(nn -1 , 0);
}



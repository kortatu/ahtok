import {
    buildBagFromSpec,
    buildEffectSpecs,
    ScenarioContext,
    ScenarioEffectSpecs,
    TokenBag,
    tokenBagPassZone,
    TokenBagSpec
} from "./Token";
import {AHCharacter} from "./AHCharacter";

export interface IScenarioSpec {
    name: string;
    scenarioEffectSpec: ScenarioEffectSpecs;
    contextSpec: IScenarioContextSpec
}

export function initContext(contextSpec: IScenarioContextSpec): ScenarioContext {
    const context: ScenarioContext = {};
    contextSpec.valuesSpec.forEach( vs => context[vs.name] = vs.initialValue)
    return context;
}

export interface IScenarioContextSpec {
    valuesSpec: IContextValueSpec[];
}

export function findValueSpec(contextSpec: IScenarioContextSpec, key: string) {
    return contextSpec.valuesSpec.find(vs => vs.name === key);
}

type IContextValueType = "number" | "boolean";

export interface IContextValueSpec {
    name: string;
    description: string;
    initialValue: number | boolean;
    type: IContextValueType;
}

export class Scenario {
    public tokenBag: TokenBag;
    public currentContext: ScenarioContext;
    private currentCharacter: AHCharacter;
    constructor(private scenarioSpec: IScenarioSpec,
                private bagSpec: TokenBagSpec,
                public characters: AHCharacter[],
                context?: ScenarioContext,
                character?: AHCharacter) {
        this.currentContext = context ?? initContext(scenarioSpec.contextSpec);
        this.currentCharacter = character ?? characters[0];
        this.tokenBag = this.buildBag();
    }

    tokenBagPassZone() {
        return tokenBagPassZone(this.tokenBag);
    }

    getCharacter() {
        return this.currentCharacter;
    }

    setCharacter(character: AHCharacter) {
        if (this.currentCharacter !== character) {
            this.currentCharacter = character;
            this.tokenBag = this.buildBag();
        }
    }

    // setContext(context: ScenarioContext) {
    //     this.currentContext = context;
    //     this.tokenBag = this.buildBag();
    // }

    getContextSpec(): IScenarioContextSpec {
        return this.scenarioSpec.contextSpec;
    }

    incContextValue(key: string): Scenario {
        const newValue: number = ((this.currentContext[key] as number) ?? 0) + 1;
        const newContext = {
            ...this.currentContext,
            [key]: newValue
        }
        return this.rebuildScenario(newContext);
    }

    decContextValue(key: string) {
        let oldValue: number = (this.currentContext[key] as number) ?? 0;
        if (oldValue > 0) {
            const newValue = oldValue - 1;
            const newContext = {
                ...this.currentContext,
                [key]: newValue
            }
            return this.rebuildScenario(newContext);
        } else {
            return this;
        }
    }

    toggleContextValue(key: string) {
        const oldValue = this.currentContext[key] as boolean;
        const newContext = {
            ...this.currentContext,
            [key]: !oldValue
        }
        return this.rebuildScenario(newContext)
    }

    private rebuildScenario(newContext: ScenarioContext) {
        return new Scenario(this.scenarioSpec, this.bagSpec, this.characters,
            newContext, this.currentCharacter);
    }

    private buildBag() {
        return buildBagFromSpec(
            this.bagSpec,
            buildEffectSpecs(...this.scenarioSpec.scenarioEffectSpec),
            this.currentCharacter,
            this.currentContext);
    }

    name() {
        return this.scenarioSpec.name;
    }
}
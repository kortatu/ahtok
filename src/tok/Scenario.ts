import {
    buildBagFromSpec,
    buildEffectSpecs,
    tokenBagPassZone,
    ScenarioContext,
    ScenarioEffectSpecs,
    TokenBag,
    TokenBagSpec
} from "./Token";
import {AHCharacter} from "./AHCharacter";

export interface IScenarioSpec {
    name: string;
    scenarioEffectSpec: ScenarioEffectSpecs;
    initContext: () => ScenarioContext;
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
        this.currentContext = context ?? scenarioSpec.initContext();
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

    setContext(context: ScenarioContext) {
        this.currentContext = context;
        this.tokenBag = this.buildBag();
    }

    incContextValue(key: string): Scenario {
        const newContext = {
            ...this.currentContext,
            [key]: (this.currentContext[key] ?? 0) + 1
        }
        return this.rebuildScenario(newContext);
    }

    decContextValue(key: string) {
        const oldValue = this.currentContext[key] ?? 0;
        if (oldValue) {
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

    private rebuildScenario(newContext: { [p: string]: number }) {
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
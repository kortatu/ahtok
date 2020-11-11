import {ScenarioContext, ScenarioEffectSpecs} from "./Token";
import {Translation} from "../Utils";

export interface IScenarioSpec {
    name: string;
    scenarioEffectSpec: ScenarioEffectSpecs;
    contextSpec: IScenarioContextSpec;
    translations: Translation;
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

export type IContextValueType = "number" | "boolean";

export interface IContextValueSpec {
    name: string;
    description: string;
    initialValue: number | boolean;
    type: IContextValueType;
    translations: Translation;
}

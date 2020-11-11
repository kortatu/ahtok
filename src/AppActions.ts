import {Action} from "redux";
import {AHCharacter} from "./tok/AHCharacter";
import {IScenarioSpec} from "./tok/Scenario";
import {TokenSpec} from "./tok/Token";

export interface IAppAction extends Action {}
export interface ICampaignAction extends IAppAction {}
export interface IScenarioAction extends IAppAction { scenarioSpec: IScenarioSpec }
export interface ICharacterAction extends IAppAction { character: AHCharacter }
export interface IContextAction extends IAppAction { key: string }
export interface IIncDecAction extends IAppAction { incDec: boolean }
export interface ITokenAction extends IAppAction { tokenSpec: TokenSpec}

// Campaign
export const NEXT_SCENARIO = 'NEXT_SCENARIO';
export const PREV_SCENARIO = 'PREV_SCENARIO';
// Scenario
export const CHANGE_SCENARIO = 'CHANGE_SCENARIO';

// Character
export const CHANGE_CHARACTER = 'CHANGE_CHARACTER';

// Context
export const INC_DEC_CONTEXT_VALUE = 'INC_DEC_CONTEXT_VALUE';
export const TOGGLE_CONTEXT_VALUE = 'TOGGLE_CONTEXT_VALUE';

// SkillTest
export const CHANGE_SKILL = 'CHANGE_SKILL';
export const CHANGE_TEST = 'CHANGE_TEST';

//BagTokenSpec
export const ADD_TOKEN = 'ADD_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export function advanceScenario(): ICampaignAction {
    return {
        type: NEXT_SCENARIO
    }
}

export function getBackScenario(): ICampaignAction {
    return {
        type: PREV_SCENARIO
    }
}

// Scenario
export function changeScenario(scenarioSpec: IScenarioSpec): IScenarioAction {
    return {
        type: CHANGE_SCENARIO,
        scenarioSpec
    }
}
// Character
export function changeCharacter(character: AHCharacter): ICharacterAction {
    return {
        type: CHANGE_CHARACTER,
        character
    }
}

// Context
export function incDecContextValue(key: string, incDec: boolean): IContextAction & IIncDecAction {
    return {
        type: INC_DEC_CONTEXT_VALUE,
        key, incDec
    }
}

export function toggleContextValue(key: string): IContextAction {
    return {
        type: TOGGLE_CONTEXT_VALUE,
        key
    }
}

// SkillTest
export function changeSkill(incDec: boolean): IIncDecAction {
    return {
        type: CHANGE_SKILL,
        incDec
    }
}
export const decreaseSkill = () => changeSkill(false);
export const increaseSkill = () => changeSkill(true);

export function changeTest(incDec: boolean): IIncDecAction {
    return {
        type: CHANGE_TEST,
        incDec
    }
}
export const decreaseTest = () => changeTest(false);
export const increaseTest = () => changeTest(true);

export function addToken(tokenSpec: TokenSpec): ITokenAction {
    return {
        type: ADD_TOKEN,
        tokenSpec
    }
}

export function removeToken(tokenSpec: TokenSpec): ITokenAction {
    return {
        type: REMOVE_TOKEN,
        tokenSpec
    }
}
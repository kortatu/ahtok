import {Action} from "redux";
import {AHCharacter} from "./tok/AHCharacter";
import {Scenario} from "./tok/Scenario";

export interface IAppAction extends Action {}
export interface ICampaignAction extends IAppAction {}
export interface IScenarioAction extends IAppAction { scenario: Scenario }
export interface ICharacterAction extends IAppAction { character: AHCharacter }
export interface IContextAction extends IAppAction { key: string }
export interface IIncDecAction extends IAppAction { incDec: boolean }

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
export function changeScenario(scenario: Scenario): IScenarioAction {
    return {
        type: CHANGE_SCENARIO,
        scenario
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
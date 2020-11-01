import {CombinedState, combineReducers, Reducer} from "redux";
import {Campaign} from "./tok/Campaign";
import {Scenario} from "./tok/Scenario";
import {incDecContextNatural, ScenarioContext} from "./tok/Token";
import {startAlvaroElCirculoRotoLPDP} from "./tok/ElCirculoRoto";
import {
    CHANGE_CHARACTER,
    CHANGE_SCENARIO,
    CHANGE_SKILL,
    CHANGE_TEST,
    IAppAction,
    ICharacterAction,
    IContextAction,
    IIncDecAction,
    INC_DEC_CONTEXT_VALUE,
    IScenarioAction,
    NEXT_SCENARIO,
    PREV_SCENARIO,
    TOGGLE_CONTEXT_VALUE
} from "./AppActions";
import {AppState} from "./AppState";
import {SkillTest} from "./tok/SkillTest";
import {AHCharacter} from "./tok/AHCharacter";
import {incDecNatural} from "./Utils";


const defaultCampaign = startAlvaroElCirculoRotoLPDP();

const  selectedCampaign: Reducer<Campaign, IAppAction> = (state: Campaign = defaultCampaign, action: IAppAction) => {
    switch (action.type) {
        case NEXT_SCENARIO:
            state.nextScenario();
            return state;
        case PREV_SCENARIO:
            state.prevScenario();
            return state;
        default:
            return state;
    }
}


const firstScenario = defaultCampaign.getScenario();
const selectedScenario: Reducer<Scenario, IAppAction> = (state = firstScenario, action: IAppAction) => {
    switch (action.type) {
        case CHANGE_SCENARIO:
            const scenarioAction = action as IScenarioAction;
            return scenarioAction.scenario;
        case CHANGE_CHARACTER:
            const charAction = action as ICharacterAction;
            return state.setCharacterImmutable(charAction.character);
        default:
            return state;
    }
}

const selectedCharacter: Reducer<AHCharacter, IAppAction> = (state = firstScenario.getCharacter(), action: IAppAction) => {
    switch (action.type) {
        case CHANGE_CHARACTER:
            const charAction = action as ICharacterAction;
            return charAction.character;
        default:
            return state;
    }
}

const gameContext: Reducer<ScenarioContext, IAppAction> = (gameContext = firstScenario.currentContext, action: IAppAction) => {
    switch (action.type) {
        case CHANGE_SCENARIO:
            const scenarioAction = action as IScenarioAction;
            return scenarioAction.scenario.currentContext;
        case INC_DEC_CONTEXT_VALUE:
            const contextAction = action as IContextAction & IIncDecAction;
            const key = contextAction.key;
            return Object.assign({}, gameContext, {
                [key]: incDecContextNatural(gameContext, key, contextAction.incDec)
            });
        case TOGGLE_CONTEXT_VALUE:
            const contextToggleAction = action as IContextAction;
            return Object.assign({}, gameContext, {
                [contextToggleAction.key]: !(gameContext[contextToggleAction.key] as boolean)
            });
        default:
            return gameContext;
    }
}

const initialSkillTest = {skill: 4, test: 2} as SkillTest;
const skillTest: Reducer<SkillTest, IAppAction> = (state = initialSkillTest, action) => {
    const skillTestAction = action as IIncDecAction;
    switch (action.type) {
        case CHANGE_SKILL:
            return Object.assign({}, state, {
                skill: incDecNatural(state.skill, skillTestAction.incDec)
            });
        case CHANGE_TEST:
            return Object.assign({}, state, {
                test: incDecNatural(state.test, skillTestAction.incDec)
            });
        default:
            return state;

    }
}

export const appReducers: Reducer<CombinedState<AppState>, IAppAction>  = combineReducers<AppState, IAppAction>({
    selectedCampaign,  selectedCharacter, selectedScenario, gameContext, skillTest
});

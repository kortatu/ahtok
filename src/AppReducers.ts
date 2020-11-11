import {CombinedState, combineReducers, Reducer} from "redux";
import {Campaign} from "./tok/Campaign";
import {initContext, IScenarioSpec} from "./tok/Scenario";
import {
    addTokens,
    incDecContextNatural,
    removeToken,
    ScenarioContext,
    TokenBagSpec
} from "./tok/Token";
import {startAlvaroElCirculoRotoLPDP} from "./tok/ElCirculoRoto";
import {
    ADD_TOKEN,
    CHANGE_CHARACTER,
    CHANGE_SCENARIO,
    CHANGE_SKILL,
    CHANGE_TEST,
    IAppAction,
    ICharacterAction,
    IContextAction,
    IIncDecAction,
    INC_DEC_CONTEXT_VALUE,
    IScenarioAction, ITokenAction,
    NEXT_SCENARIO,
    PREV_SCENARIO, REMOVE_TOKEN,
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


const firstScenario = defaultCampaign.getScenarioSpec();
const selectedScenario: Reducer<IScenarioSpec, IAppAction> = (state = firstScenario, action: IAppAction) => {
    switch (action.type) {
        case CHANGE_SCENARIO:
            return (action as IScenarioAction).scenarioSpec;
        default:
            return state;
    }
}

const selectedCharacter: Reducer<AHCharacter, IAppAction> = (state = defaultCampaign.characters[0], action: IAppAction) => {
    switch (action.type) {
        case CHANGE_CHARACTER:
            return (action as ICharacterAction).character;
        default:
            return state;
    }
}
const initialContext = initContext(firstScenario.contextSpec);
const gameContext: Reducer<ScenarioContext, IAppAction> = (gameContext = initialContext, action: IAppAction) => {
    switch (action.type) {
        case CHANGE_SCENARIO:
            return initContext((action as IScenarioAction).scenarioSpec.contextSpec);
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

const bagSpec: Reducer<TokenBagSpec, IAppAction> = (state = defaultCampaign.currentBagSpec, action) => {
    const tokenAction = action as ITokenAction;
    switch (action.type) {
        case ADD_TOKEN:
            return addTokens(state, tokenAction.tokenSpec);
        case REMOVE_TOKEN:
            return removeToken(state, tokenAction.tokenSpec.name);
        default:
            return state;
    }
}

export const appReducers: Reducer<CombinedState<AppState>, IAppAction>  = combineReducers<AppState, IAppAction>({
    selectedCampaign,  bagSpec, selectedCharacter, selectedScenario, gameContext, skillTest
});

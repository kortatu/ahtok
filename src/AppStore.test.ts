import "jest";
import {resetStore, store} from "./AppStore";
import {
    addToken,
    advanceScenario,
    changeCharacter,
    changeScenario,
    changeSkill,
    changeTest,
    getBackScenario,
    increaseSkill, removeToken
} from "./AppActions";
import {repeat} from "./Utils";
import {buildBagFromState} from "./AppState";
import {addTokens, tokenSpecDef, tokensWithValue} from "./tok/Token";

describe('Store tests', () => {
    it('Basic Store test', () => {
        expect(store).toBeDefined();
        expect(store.getState()).toBeDefined();
        const state = store.getState();
        expect(state.selectedCampaign).toBeDefined();
        expect(state.selectedScenario).toBeDefined();
        expect(state.selectedCharacter).toBeDefined();
        expect(state.gameContext).toBeDefined();
        expect(state.skillTest).toBeDefined();
    });

    it('Dispatches skill actions', () => {
        const {skill} = store.getState().skillTest;
        store.dispatch(changeSkill(true));
        expect(store.getState().skillTest.skill).toBe(skill + 1);
        store.dispatch(changeSkill(false));
        expect(store.getState().skillTest.skill).toBe(skill);
    });

    it('Dispatches test actions', () => {
        const {test} = store.getState().skillTest;
        store.dispatch(changeTest(true));
        expect(store.getState().skillTest.test).toBe(test + 1);
        const decreaseTest = changeTest(false);
        store.dispatch(decreaseTest);
        expect(store.getState().skillTest.test).toBe(test);
        // Testing min value is 0. We decrease current test currentTest + 1 and still is >= 0
        const currentTest = store.getState().skillTest.test;
        repeat(currentTest + 1, () => store.dispatch(decreaseTest));
        expect(store.getState().skillTest.test).toBeGreaterThanOrEqual(0);
    });

    it('Changes the current context when setting a new scenario', () => {
        const context = store.getState().gameContext;
        const campaign = store.getState().selectedCampaign;
        const newScenario = campaign.nextScenario();
        store.dispatch(changeScenario(newScenario));
        const newContext = store.getState().gameContext;
        expect(newContext).not.toBe(context);
        // Dispatching other action does not change context
        const result = store.dispatch(increaseSkill());
        expect(store.getState().gameContext).toBe(newContext);
    });

    it('Goes to the same scenario after advancing and getting back scenario', () => {
        const currentScenario = store.getState().selectedScenario;
        store.dispatch(advanceScenario());
        store.dispatch(getBackScenario());
        expect(store.getState().selectedScenario).toBe(currentScenario);
    });

    it('Changes current bag when adding tokens to the bag spec', () => {
        resetStore();
        const currentBag = buildBagFromState(store.getState());
        store.dispatch(addToken(
            tokenSpecDef(-5, 1,  false)));
        const newBag = buildBagFromState(store.getState());
        const minus5Before = tokensWithValue(currentBag, -5);
        const minus5After = tokensWithValue(newBag, -5);
        expect(minus5After.length).toBeGreaterThan(minus5Before.length);
    });

    it('Changes current bag when removing tokens to the bag spec', () => {
        resetStore();
        const currentBag = buildBagFromState(store.getState());
        store.dispatch(addToken(
            tokenSpecDef(-5, 1,  false)));
        const secondBag = buildBagFromState(store.getState());
        store.dispatch(removeToken(
            tokenSpecDef(-5, 1,  false)));
        const newBag = buildBagFromState(store.getState());
        const minus5Before = tokensWithValue(currentBag, -5);
        const minus5Second = tokensWithValue(secondBag, -5);
        const minus5After = tokensWithValue(newBag, -5);
        expect(minus5Second.length).toBeGreaterThan(minus5Before.length);
        expect(minus5After.length).toBeLessThan(minus5Second.length);
        expect(minus5After.length).toBe(minus5Before.length);
    });
});
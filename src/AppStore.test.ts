import "jest";
import {resetStore, store} from "./AppStore";
import {
    advanceScenario,
    changeCharacter,
    changeScenario,
    changeSkill,
    changeTest,
    getBackScenario,
    increaseSkill
} from "./AppActions";
import {repeat} from "./Utils";

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

    it('Changes the current scenario when campaign advances', () => {
        const currentScenario = store.getState().selectedScenario;
        store.dispatch(advanceScenario());
        store.dispatch(changeScenario(store.getState().selectedCampaign.getScenario()));
        expect(store.getState().selectedScenario).not.toBe(currentScenario);
    });

    it('Changes the current scenario when going back scenario', () => {
        const currentScenario = store.getState().selectedScenario;
        store.dispatch(getBackScenario());
        store.dispatch(changeScenario(store.getState().selectedCampaign.getScenario()));
        expect(store.getState().selectedScenario).not.toBe(currentScenario);
    });

    it('Goes to the same scenario after advancing and getting back scenario', () => {
        const currentScenario = store.getState().selectedScenario;
        store.dispatch(advanceScenario());
        store.dispatch(getBackScenario());
        expect(store.getState().selectedScenario).toBe(currentScenario);
    });

    it('Changes the current character on the scenario', () => {
        resetStore();
        const currentScenario = store.getState().selectedScenario;
        const campaign = store.getState().selectedCampaign;
        const characters = campaign.characters;
        expect(characters[1]).not.toBe(currentScenario.getCharacter());
        store.dispatch(changeCharacter(characters[1]));
        const newCharacter = store.getState().selectedCharacter
        expect(newCharacter).toBe(characters[1]);
        expect(store.getState().selectedCharacter).toBe(newCharacter);
    });

    it('Changes the current bag when changing character', () => {
        resetStore();
        const currentScenario = store.getState().selectedScenario;
        const campaign = store.getState().selectedCampaign;
        const characters = campaign.characters;
        // Expect Joe's bag
        expect(currentScenario.tokenBagPassZone().get(1)?.tokens).toHaveLength(2);
        store.dispatch(changeCharacter(characters[1])); // changed to Diana
        const newCharacter = store.getState().selectedCharacter
        const newScenario = store.getState().selectedScenario;
        const newScenarioBag = newScenario.tokenBagPassZone();
        expect(newScenario.getCharacter()).toBe(characters[1]);
        expect(newScenarioBag.get(1)).toBeDefined();
        expect(newScenarioBag.get(1)?.tokens).toHaveLength(1);
    });
});
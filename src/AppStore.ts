import {createStore, Store} from "redux";
import {appReducers} from "./AppReducers";
import {changeScenario, IAppAction} from "./AppActions";
import {AppState} from "./AppState";


export const store: Store<AppState, IAppAction> = createStore<AppState, IAppAction, {}, {}>(appReducers);

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    if (state.selectedScenario !== state.selectedCampaign.getScenario()) {
        store.dispatch(changeScenario(state.selectedCampaign.getScenario()));
    }
});
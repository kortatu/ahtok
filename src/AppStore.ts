import {createStore, Store} from "redux";
import {appReducers} from "./AppReducers";
import { IAppAction} from "./AppActions";
import {AppState} from "./AppState";


export let store: Store<AppState, IAppAction> = createStore<AppState, IAppAction, {}, {}>(appReducers);

export function resetStore() {
    store = createStore<AppState, IAppAction, {}, {}>(appReducers);
}
import {createStore, Store} from "redux";
import {appReducers} from "./AppReducers";
import {IAppAction} from "./AppActions";
import {AppState} from "./AppState";
import {Campaign, Campaigns, ICampaignSpec} from "./tok/Campaign";
import {SkillTest} from "./tok/SkillTest";
import {ScenarioContext, TokenBagSpec} from "./tok/Token";
import {AHCharacters} from "./tok/AHCharacter";
import {initContext} from "./tok/Scenario";
import {startAlvaroLaEraOlvidada} from "./tok/LaEraOlvidada";


interface IStorageStage {
    name: string;
    campaignSpecId: string;
    bagSpec: TokenBagSpec;
    characters: string[];
    currentScenario: number;
    currentCharacter: string;
    currentContext: ScenarioContext;
}
function loadStorageStage(): IStorageStage | undefined {
    const storageStateString = localStorage.getItem("ahtok.kortsoft.net/state");
    return storageStateString ? JSON.parse(storageStateString) : undefined;
}


const LANGUAGE_STORE_KEY = "ahtok.kortsoft.net/lang";

export function loadCurrentLang() {
    const appLang = localStorage.getItem(LANGUAGE_STORE_KEY);
    if (appLang === null) {
        let userLang: string = navigator.language;
        const dashPosition = userLang.indexOf("-");
        if (dashPosition > -1) {
            userLang = userLang.substring(0, dashPosition);
        }
        return userLang;
    }
    return appLang;
}

function initialState():AppState {
    function defaultCampaign() {
        return startAlvaroLaEraOlvidada();
    }
    const preloadCampaign = loadStorageStage();
    if (preloadCampaign) {
        const campaignSpec: ICampaignSpec = Campaigns[preloadCampaign.campaignSpecId];
        const characters = preloadCampaign.characters.map(cId => AHCharacters[cId]);
        const campaign = new Campaign(
            preloadCampaign.name, campaignSpec, characters,
            preloadCampaign.bagSpec, preloadCampaign.currentScenario);
        const character = AHCharacters[preloadCampaign.currentCharacter];
        return {
            selectedCampaign: campaign,
            selectedScenario: campaign.getScenarioSpec(),
            selectedCharacter: character,
            skillTest: {skill: 4, test: 2} as SkillTest,
            gameContext: preloadCampaign.currentContext,
            bagSpec: preloadCampaign.bagSpec
        }
    } else {
        const campaign = defaultCampaign();
        const currentScenarioSpec = campaign.getScenarioSpec();
        return {
            selectedCampaign: campaign,
            selectedScenario: currentScenarioSpec,
            selectedCharacter: campaign.characters[0],
            skillTest: {skill: 4, test: 2} as SkillTest,
            gameContext: initContext(currentScenarioSpec.contextSpec),
            bagSpec: campaign.currentBagSpec,
        };
    }

}

const appState = initialState();
export let store: Store<AppState, IAppAction> =
    createStore<AppState, IAppAction, {}, {}>(appReducers, appState);

export function resetStore() {
    store = createStore<AppState, IAppAction, {}, {}>(appReducers);
}

export function saveLang(lang: string) {
    localStorage.setItem(LANGUAGE_STORE_KEY, lang);
    window.location.reload();
}

store.subscribe(() => {
    const campaign = store.getState().selectedCampaign;
    const newStorageCampaign: IStorageStage = {
        name: campaign.name,
        campaignSpecId: campaign.campaignSpec.id,
        bagSpec: store.getState().bagSpec,
        characters: campaign.characters.map(c => c.id),
        currentScenario: campaign.currentScenario,
        currentCharacter: store.getState().selectedCharacter.id,
        currentContext: store.getState().gameContext
    };
    localStorage.setItem("ahtok.kortsoft.net/state", JSON.stringify(newStorageCampaign));
});
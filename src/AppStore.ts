import {createStore, Store} from "redux";
import {appReducers} from "./AppReducers";
import {IAppAction} from "./AppActions";
import {AppState} from "./AppState";
import {Campaign, Campaigns, ICampaignSpec} from "./tok/Campaign";
import {SkillTest} from "./tok/SkillTest";
import {startAlvaroElCirculoRotoLPDP} from "./tok/ElCirculoRoto";
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
            gameContext: preloadCampaign.currentContext
        }
    } else {
        const campaign = defaultCampaign();
        const currentScenarioSpec = campaign.getScenarioSpec();
        return {
            selectedCampaign: campaign,
            selectedScenario: currentScenarioSpec,
            selectedCharacter: campaign.characters[0],
            skillTest: {skill: 4, test: 2} as SkillTest,
            gameContext: initContext(currentScenarioSpec.contextSpec)
        };
    }

}

const appState = initialState();
console.log("Loaded initial state", appState);
export let store: Store<AppState, IAppAction> =
    createStore<AppState, IAppAction, {}, {}>(appReducers, appState);

export function resetStore() {
    store = createStore<AppState, IAppAction, {}, {}>(appReducers);
}

store.subscribe(() => {
    const campaign = store.getState().selectedCampaign;
    const newStorageCampaign: IStorageStage = {
        name: campaign.name,
        campaignSpecId: campaign.campaignSpec.id,
        bagSpec: campaign.currentBagSpec,
        characters: campaign.characters.map(c => c.id),
        currentScenario: campaign.currentScenario,
        currentCharacter: store.getState().selectedCharacter.id,
        currentContext: store.getState().gameContext
    };
    localStorage.setItem("ahtok.kortsoft.net/state", JSON.stringify(newStorageCampaign));
});
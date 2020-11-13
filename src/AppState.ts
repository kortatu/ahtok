import {Campaign} from "./tok/Campaign";
import {IScenarioSpec} from "./tok/Scenario";
import {buildBagFromSpec, buildEffectSpecs, ScenarioContext, TokenBagSpec} from "./tok/Token";
import {SkillTest} from "./tok/SkillTest";
import {AHCharacter} from "./tok/AHCharacter";

export interface AppState {
    selectedCampaign: Campaign;
    bagSpec: TokenBagSpec;
    selectedScenario: IScenarioSpec;
    selectedCharacter: AHCharacter;
    gameContext: ScenarioContext;
    skillTest: SkillTest;
}

export function buildBagFromState(appState: AppState) {
    return buildBagFromSpec(
        appState.bagSpec,
        buildEffectSpecs(...appState.selectedScenario.scenarioEffectSpec),
        appState.selectedCharacter,
        appState.gameContext
    );
}

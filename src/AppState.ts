import {Campaign} from "./tok/Campaign";
import {Scenario} from "./tok/Scenario";
import {ScenarioContext} from "./tok/Token";
import {SkillTest} from "./tok/SkillTest";
import {AHCharacter} from "./tok/AHCharacter";

export interface AppState {
    selectedCampaign: Campaign;
    selectedScenario: Scenario;
    selectedCharacter: AHCharacter;
    gameContext: ScenarioContext;
    skillTest: SkillTest;
}

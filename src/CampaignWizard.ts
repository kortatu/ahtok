import {AHCharacter} from "./tok/AHCharacter";
import {AHLevel} from "./tok/Campaign";

export interface CampaignWizard {
    campaignId?: string;
    level?: AHLevel;
    characters: AHCharacter[];
}
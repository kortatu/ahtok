import {IScenarioSpec} from "./Scenario";
import {addTokens, TokenBagSpec, TokenSpec} from "./Token";
import {AHCharacter} from "./AHCharacter";
import {buildElCirculoRotoCampaignSpec} from "./ElCirculoRoto";

export type AHLevel = "easy" | "normal" | "hard" | "expert";
type IBagSpecByLevel = {
    [key in AHLevel]: TokenBagSpec;
};

export interface ICampaignSpec {
    id: string;
    name: string;
    scenarios: IScenarioSpec[];
    bagSpecsByLevel: IBagSpecByLevel;
}

interface ICampaigns {
    [key: string]: ICampaignSpec
}
export const Campaigns: ICampaigns = {
    TheCircleUndone: buildElCirculoRotoCampaignSpec() as ICampaignSpec
}


interface ICampaign {
}

export class Campaign implements ICampaign {
    public currentScenario = 0;

    constructor(public name: string,
                public campaignSpec: ICampaignSpec,
                public characters: AHCharacter[],
                public currentBagSpec: TokenBagSpec,
                currentScenario = 0) {
        this.startCampaign(currentScenario);
    }

    public static start(campaignSpec: ICampaignSpec, characters: AHCharacter[], level: AHLevel): Campaign {
        return new Campaign(campaignSpec.name, campaignSpec, characters, campaignSpec.bagSpecsByLevel[level]);
    }


    startCampaign(scenarioNum = 0) {
        this.currentScenario = scenarioNum;
        let scenarioIndex = 0;
        while (scenarioIndex <= scenarioNum) {
            this.currentScenario = scenarioIndex;
            scenarioIndex++;
        }
    }

    getScenarioSpec() {
        return this.campaignSpec.scenarios[this.currentScenario];
    }

    addTokensToBagSpec(...tokens: TokenSpec[]) {
        this.currentBagSpec = addTokens(this.currentBagSpec, ...tokens);
    }

    nextScenario() {
        if ((this.currentScenario + 1 ) < this.campaignSpec.scenarios.length) {
            this.currentScenario++;
            // console.log("Current scenario index", this.currentScenario, "name", this.campaignSpec.scenarios[this.currentScenario].name);
            if (this.currentScenario >= this.campaignSpec.scenarios.length) {
                // TODO: Modify current bag spec depending on resolution or preparation of new scenario
                // advanceScenario
            }
        }
        return this.getScenarioSpec();
    }

    // Returns to the previous scenario with the bag as it was
    prevScenario() {
        if (this.currentScenario  > 0) {
            this.currentScenario--;
        }
        return this.getScenarioSpec();
    }
}

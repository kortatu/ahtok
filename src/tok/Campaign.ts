import {Scenario, IScenarioSpec} from "./Scenario";
import {addTokens, TokenBagSpec, TokenSpec} from "./Token";
import {AHCharacter} from "./AHCharacter";

export type AHLevel = "easy" | "normal" | "hard" | "expert";
type IBagSpecByLevel = {
    [key in AHLevel]: TokenBagSpec;
};

export interface ICampaignSpec {
    name: string;
    scenarios: IScenarioSpec[];
    bagSpecsByLevel: IBagSpecByLevel;
}


interface ICampaign {
}

export class Campaign implements ICampaign {
    private scenarios: Scenario[] = [];
    private currentBagSpec: TokenBagSpec;
    private currentScenario = 0;
    public name: string;

    constructor(private campaignSpec: ICampaignSpec, public characters: AHCharacter[], level: AHLevel) {
        this.currentBagSpec = campaignSpec.bagSpecsByLevel[level];
        this.name = campaignSpec.name;
    }


    startCampaign(scenarioNum = 0) {
        this.currentScenario = scenarioNum;
        let scenarioIndex = 0;
        while (scenarioIndex <= scenarioNum) {
            this.currentScenario = scenarioIndex;
            const scenario = this.buildScenario();
            this.scenarios.push(scenario);
            scenarioIndex++;
        }
    }

    private buildScenario() {
        return new Scenario(
            this.campaignSpec.scenarios[this.currentScenario],
            this.currentBagSpec,
            this.characters
        );
    }

    getScenario() {
        return this.scenarios[this.currentScenario];
    }

    addTokensToBagSpec(...tokens: TokenSpec[]) {
        this.currentBagSpec = addTokens(this.currentBagSpec, ...tokens);
    }

    nextScenario() {
        if ((this.currentScenario + 1 ) < this.campaignSpec.scenarios.length) {
            this.currentScenario++;
            console.log("Current scenario index", this.currentScenario, "name", this.campaignSpec.scenarios[this.currentScenario].name);
            if (this.currentScenario >= this.scenarios.length) {
                // TODO: Modify current bag spec depending on resolution or preparation of new scenario
                const newScenario = this.buildScenario();
                this.scenarios.push(newScenario);
            }
        }
        return this.getScenario();
    }

    // Returns to the previous scenario with the bag as it was
    prevScenario() {
        if (this.currentScenario  > 0) {
            this.currentScenario--;
        }
        return this.getScenario();
    }
}

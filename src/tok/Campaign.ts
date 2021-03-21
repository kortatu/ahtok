import {IScenarioSpec} from "./Scenario";
import {addTokens, TokenBagSpec, TokenSpec} from "./Token";
import {AHCharacter} from "./AHCharacter";
import {buildElCirculoRotoCampaignSpec} from "./ElCirculoRoto";
import {Translation} from "../Utils";
import {buildLaEraOlvidadaCampaignSpec} from "./LaEraOlvidada";
import {buildElLegadoDeDunwichCampaignSpec} from "./ElLegadoDeDunwich";
import {buildLosDevoradoresACampaignSpec, buildLosDevoradoresBCampaignSpec} from "./LosDevoradoresDeSuenos";
import {buildConspiraciondeInnsmouthCampaignSpec} from "./LaConspiracionDeInnsmouth";
import {buildCaminoACarcosaCampaignSpec} from "./CaminoACarcosa";

export type AHLevel = "easy" | "normal" | "hard" | "expert";
export const AHLevels = ["easy" , "normal" , "hard" , "expert"]
type IBagSpecByLevel = {
    [key in AHLevel]: TokenBagSpec;
};

export interface ICampaignSpec {
    id: string;
    name: string;
    scenarios: IScenarioSpec[];
    bagSpecsByLevel: IBagSpecByLevel;
    translations: Translation;
}

interface ICampaigns {
    [key: string]: ICampaignSpec
}
export const Campaigns: ICampaigns = {
    TheCircleUndone: buildElCirculoRotoCampaignSpec(),
    TheForgottenAge: buildLaEraOlvidadaCampaignSpec(),
    TheDunwichLegacy: buildElLegadoDeDunwichCampaignSpec(),
    TheDreamEatersA: buildLosDevoradoresACampaignSpec(),
    TheDreamEatersB: buildLosDevoradoresBCampaignSpec(),
    InnsmouthConspiracy: buildConspiraciondeInnsmouthCampaignSpec(),
    PathToCarcosa: buildCaminoACarcosaCampaignSpec(),
}

export const campaignTranslations = Object.values(Campaigns).reduce<any>((allTrans, campaign) => {
    const thisTranslations = campaign.translations;
    Object.keys(thisTranslations).forEach(lang => {
        if (allTrans[lang] === undefined) {
            allTrans[lang] = {}
        }
        allTrans[lang][campaign.name] = thisTranslations[lang];
    });
    campaign.scenarios.forEach(scenario =>  {
        Object.keys(scenario.translations).forEach(scenarioLang => {
            if (allTrans[scenarioLang] === undefined) {
                allTrans[scenarioLang] = {}
            }
            allTrans[scenarioLang][scenario.name] = scenario.translations[scenarioLang]
        });
        scenario.contextSpec.valuesSpec.forEach(valueSpec => {
            Object.keys(valueSpec.translations).forEach(valueSpecLang => {
                if (allTrans[valueSpecLang] === undefined) {
                    allTrans[valueSpecLang] = {}
                }
                allTrans[valueSpecLang][valueSpec.name] = valueSpec.translations[valueSpecLang];
            });

        })
    });
    return allTrans;
}, {});

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

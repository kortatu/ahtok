import {ICampaignSpec} from "./Campaign";
import {buildBagSpec, commonTokenEffectSpec, FALLO_AUTOMATICO, TokenBagSpec, tokenSpecDef} from "./Token";
import {IScenarioSpec} from "./Scenario";

function easy(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(1, 2),
        tokenSpecDef(0, 3),
        tokenSpecDef(-1, 3),
        tokenSpecDef(-2,2),
        tokenSpecDef(0, 2, true, "Calavera"),
        tokenSpecDef(0, 1, true, "Sectario"),
        FALLO_AUTOMATICO
    );
}
export function normal(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(1, 1),
        tokenSpecDef(0, 2),
        tokenSpecDef(-1, 3),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 1),
        tokenSpecDef(-4, 1),
        tokenSpecDef(0, 2, true, "Calavera"),
        tokenSpecDef(0, 1, true, "Sectario"),
        FALLO_AUTOMATICO
    );
}

function hard (): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(0, 3),
        tokenSpecDef(-1, 2),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 2),
        tokenSpecDef(-4, 1),
        tokenSpecDef(-5, 1),
        tokenSpecDef(0, 2, true, "Calavera"),
        tokenSpecDef(0, 1, true, "Sectario"),
        FALLO_AUTOMATICO
    );
}

function expert (): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(0, 1),
        tokenSpecDef(-1, 2),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 2),
        tokenSpecDef(-4, 2),
        tokenSpecDef(-5, 1),
        tokenSpecDef(-6, 1),
        tokenSpecDef(-8, 1),
        tokenSpecDef(0, 2, true, "Calavera"),
        tokenSpecDef(0, 1, true, "Sectario"),
        FALLO_AUTOMATICO
    );
}

function SeCierraElTelon(): IScenarioSpec {
    const HORROR_ON_YOU="Horror on you"
    return {
        name: "Extracurricular Activiry",
        translations: {
            "es": "Actividad extracurricular",
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "Calavera", effect: (tokenBag) => tokenBag.context[HORROR_ON_YOU] >= 3 ? -3 : -1},
            {name: "Sectario", effect: (tokenBag) => -4},
            {name: "Antiguo", effect: (tokenBag) => -4},
            {name: "Lápida", effect: (tokenBag) => -4},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: HORROR_ON_YOU,
                description: "Horror on you",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Horror que tienes"
                }
            }
            ]
        }
    }
}

export function buildCaminoACarcosaCampaignSpec(): ICampaignSpec {
    return {
        id: "PathToCarcosa",
        name: "Path to Carcosa",
        scenarios: [
            SeCierraElTelon()
        ],
        bagSpecsByLevel: {
            easy: easy(),
            normal: normal(),
            hard: hard(),
            expert: expert(),
        },
        translations: {
            "es": "El legado de Dunwich"
        }
    }
}
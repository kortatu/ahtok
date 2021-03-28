import {ICampaignSpec} from "./Campaign";
import {
    buildBagSpec,
    commonTokenEffectSpec,
    FALLO_AUTOMATICO,
    seal,
    tokenAverage,
    TokenBagSpec,
    tokenSpecDef
} from "./Token";
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
        name: "Curtain Call",
        translations: {
            "es": "Se cierra el telón",
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

function ElUltimoRey(): IScenarioSpec {
    const SHROUD_OF_YOUR_LOCATION="Shroud of your location"
    return {
        name: "The Last King",
        translations: {
            "es": "El último rey",
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "Calavera", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Calavera"))},
            {name: "Sectario", effect: (tokenBag) => -2},
            {name: "Lápida", effect: (tokenBag) => -4},
            {name: "Antiguo", effect: (tokenBag) => -tokenBag.context[SHROUD_OF_YOUR_LOCATION]},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: SHROUD_OF_YOUR_LOCATION,
                description: "Shroud of your location",
                type: "number",
                initialValue: 1,
                translations: {
                    "es": "Velo de tu lugar"
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
            SeCierraElTelon(), ElUltimoRey()
        ],
        bagSpecsByLevel: {
            easy: easy(),
            normal: normal(),
            hard: hard(),
            expert: expert(),
        },
        translations: {
            "es": "El camino a Carcosa"
        }
    }
}
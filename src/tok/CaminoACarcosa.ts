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

export function EcosDelPasado(): IScenarioSpec {
    const HIGHEST_DOOM = "Highest doom";
    return {
        name: "Echoes of the Past",
        translations: {
            "es": "Ecos del pasado",
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "Calavera", effect: (tokenBag) => -tokenBag.context[HIGHEST_DOOM]},
            {name: "Sectario", effect: (tokenBag) => -2},
            {name: "Lápida", effect: (tokenBag) => -2},
            {name: "Antiguo", effect: (tokenBag) => -2},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: HIGHEST_DOOM,
                description: "Highest doom on an enemy",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Mayor perdición en un enemigo"
                }
            }
            ]
        }
    }
}

export function ElJuramentoInconfesable(): IScenarioSpec {
    const HORROR_ON_YOU = "Horror on you";
    const BASE_SHROUD = "Base shroud of your location";
    const CHOOSE_AN_ENEMY = "Randomly choose an enemy and place it beneath the act"
    return {
        name: "The Unspeakable Oath",
        translations: {
            "es": "El juramento inconfesable",
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "Calavera", effect: (tokenBag) => -1},
            {name: "Sectario", effect: (tokenBag) => -tokenBag.context[HORROR_ON_YOU]},
            {name: "Lápida", effect: (tokenBag) => -tokenBag.context[BASE_SHROUD]},
            {name: "Antiguo", effect: (tokenBag) => tokenBag.context[CHOOSE_AN_ENEMY] ? 0 : -99},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: HORROR_ON_YOU,
                description: "Amount of horror on you",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Horror que tengas"
                }
            }, {
                name: BASE_SHROUD,
                description: "Base shroud of your location",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Valor de velo básico de tu lugar"
                }
            }, {
                name: CHOOSE_AN_ENEMY,
                description: "Randomly choose an enemy from among the set-aside Monsters and place it beneath the act",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Elige un monstruo al azar y colócalo bajo el plan"
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
            SeCierraElTelon(), ElUltimoRey(), EcosDelPasado(), ElJuramentoInconfesable()
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
import {buildBagSpec, FALLO_AUTOMATICO, seal, tokenAverage, TokenBagSpec, tokenSpecDef} from "./Token";
import {ICampaignSpec} from "./Campaign";
import {IScenarioSpec} from "./Scenario";

function easyA(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(1, 2),
        tokenSpecDef(0, 3),
        tokenSpecDef(-1, 2),
        tokenSpecDef(-2,2),
        tokenSpecDef(0, 1, true, "Sectario"),
        tokenSpecDef(0, 2, true, "Lápida"),
        FALLO_AUTOMATICO
    );
}
function normalA(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(1, 1),
        tokenSpecDef(0, 2),
        tokenSpecDef(-1, 2),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 1),
        tokenSpecDef(-4, 1),
        tokenSpecDef(0, 1, true, "Sectario"),
        tokenSpecDef(0, 2, true, "Lápida"),
        FALLO_AUTOMATICO
    );
}

function hardA(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(0, 2),
        tokenSpecDef(-1, 2),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 2),
        tokenSpecDef(-4, 1),
        tokenSpecDef(-5, 1),
        tokenSpecDef(0, 1, true, "Sectario"),
        tokenSpecDef(0, 2, true, "Lápida"),
        FALLO_AUTOMATICO
    );
}

function expertA(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(0, 1),
        tokenSpecDef(-1, 2),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 1),
        tokenSpecDef(-4, 2),
        tokenSpecDef(-5, 1),
        tokenSpecDef(-6, 1),
        tokenSpecDef(-8, 1),
        tokenSpecDef(0, 1, true, "Sectario"),
        tokenSpecDef(0, 2, true, "Lápida"),
        FALLO_AUTOMATICO
    );
}

function easyB(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(1, 2),
        tokenSpecDef(0, 3),
        tokenSpecDef(-1, 3),
        tokenSpecDef(-2,2),
        tokenSpecDef(0, 2, true, "Calavera"),
        tokenSpecDef(0, 1, true, "Sectario"),
        tokenSpecDef(0, 2, true, "Antiguo"),
        FALLO_AUTOMATICO
    );
}
function normalB(): TokenBagSpec {
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
        tokenSpecDef(0, 2, true, "Antiguo"),
        FALLO_AUTOMATICO
    );
}

function hardB(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(0, 4),
        tokenSpecDef(-1, 2),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 2),
        tokenSpecDef(-4, 1),
        tokenSpecDef(-5, 1),
        tokenSpecDef(0, 2, true, "Calavera"),
        tokenSpecDef(0, 1, true, "Sectario"),
        tokenSpecDef(0, 2, true, "Antiguo"),
        FALLO_AUTOMATICO
    );
}

function expertB(): TokenBagSpec {
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
        tokenSpecDef(0, 2, true, "Antiguo"),
        FALLO_AUTOMATICO
    );
}

function MásAlláDeLasPuertasDelSueño(): IScenarioSpec {
    const CARDS_IN_YOUR_HAND="Cards in your hand";
    const REVEALED_WOODS="Revealed Woods locations";
    return {
        name: "Beyond the Gates of Sleep",
        translations: {
            "es": "Más allá de las puertas del sueño",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => Math.ceil(-tokenBag.context[CARDS_IN_YOUR_HAND] / 2)},
            {name: "Sectario", effect: (tokenBag) => -tokenBag.context[REVEALED_WOODS]},
            {name: "Lápida", effect: (_) => -2},
        ],
        contextSpec: {
            valuesSpec: [{
                name: CARDS_IN_YOUR_HAND,
                description: "Number of cards in your hand",
                type: "number",
                initialValue: 5,
                translations: {
                    "es": "Cartas en tu mano"
                }
            }, {
                name: REVEALED_WOODS,
                description: "Number of revealed Enchanted Woods locations",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Número de bosques encantados revelados"
                }
            }
            ]
        }
    };
}

function ElLadoOscuroDeLaLuna(): IScenarioSpec {
    const ALARM_LEVEL="Alarm level";
    return {
        name: "Dark Side of the Moon",
        translations: {
            "es": "El lado oscuro de la luna",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => -Math.ceil(tokenBag.context[ALARM_LEVEL] as number / 2)},
            {name: "Sectario", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Sectario"))},
            {name: "Lápida", effect: (_) => -1},
            {name: "Antiguo", effect: (_) => +1},
        ],
        contextSpec: {
            valuesSpec: [{
                name: ALARM_LEVEL,
                description: "Alarm level",
                type: "number",
                initialValue: 1,
                translations: {
                    "es": "Nivel de alarma"
                }
            }
            ]
        }
    };
}

function DondeMoranLosDioses(): IScenarioSpec {
    const CURRENT_ACT="Current act";
    return {
        name: "Where Gods Dwell",
        translations: {
            "es": "Donde moran los dioses",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => -tokenBag.context[CURRENT_ACT] as number},
            {name: "Sectario", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Sectario"))},
            {name: "Lápida", effect: (_) => -4},
            {name: "Antiguo", effect: (_) => 0},
        ],
        contextSpec: {
            valuesSpec: [{
                name: CURRENT_ACT,
                description: "Number of the current act",
                type: "number",
                initialValue: 1,
                translations: {
                    "es": "Número del acto en curso"
                }
            }
            ]
        }
    };
}
// ----- Campaign B

function PuntoSinRetorno(): IScenarioSpec {
    const DAMAGE_ON_SCENARIO = "Damage on scenario card";
    return {
        name: "Point of No Return",
        translations: {
            "es": "Punto sin retorno",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => -tokenBag.context[DAMAGE_ON_SCENARIO]},
            {name: "Sectario", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Sectario"))},
            {name: "Lápida", effect: (_) => +1},
            {name: "Antiguo", effect: (_) => -3},
        ],
        contextSpec: {
            valuesSpec: [{
                name: DAMAGE_ON_SCENARIO,
                description: "Damage on this card",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Daño en carta de escenario"
                }
            }
            ]
        }
    };
}

function TejedoraDelCosmos(): IScenarioSpec {
    const HIGHEST_DOOM = "Highest doom on a location";
    return {
        name: "Weaver of the Cosmos",
        translations: {
            "es": "Tejedora del cosmos",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => -tokenBag.context[HIGHEST_DOOM]},
            {name: "Sectario", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Sectario"))},
            {name: "Lápida", effect: (_) => 0},
            {name: "Antiguo", effect: (_) => -3},
        ],
        contextSpec: {
            valuesSpec: [{
                name: HIGHEST_DOOM,
                description: "Highest amount of doom on a location in play",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Mayor perdición en un lugar"
                }
            }
            ]
        }
    };
}

export function buildLosDevoradoresACampaignSpec(): ICampaignSpec {
    return {
        id: "TheDreamEatersA",
        name: "The Dream-Eaters A",
        scenarios: [
            MásAlláDeLasPuertasDelSueño(), ElLadoOscuroDeLaLuna(), DondeMoranLosDioses()
        ],
        bagSpecsByLevel: {
            easy: easyA(),
            normal: normalA(),
            hard: hardA(),
            expert: expertA(),
        },
        translations: {
            "es": "Los devoradores de sueños A"
        }
    }
}

export function buildLosDevoradoresBCampaignSpec(): ICampaignSpec {
    return {
        id: "TheDreamEatersB",
        name: "The Dream-Eaters B",
        scenarios: [
            PuntoSinRetorno(),TejedoraDelCosmos()
        ],
        bagSpecsByLevel: {
            easy: easyB(),
            normal: normalB(),
            hard: hardB(),
            expert: expertB(),
        },
        translations: {
            "es": "Los devoradores de sueños B"
        }
    }
}
import {
    buildBagSpec, commonTokenEffectSpec,
    elderSignEffect,
    FALLO_AUTOMATICO,
    seal,
    tokenAverage,
    TokenBag,
    TokenBagSpec,
    tokenSpecDef
} from "./Token";
import {Campaign, ICampaignSpec} from "./Campaign";
import {IScenarioSpec} from "./Scenario";
import {AHCharacters} from "./AHCharacter";

function easy(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(1, 2),
        tokenSpecDef(0, 3),
        tokenSpecDef(-1, 2),
        tokenSpecDef(-2,1),
        tokenSpecDef(-3, 1),
        tokenSpecDef(0, 2, true, "Calavera"),
        tokenSpecDef(0, 1, true, "Antiguo"),
        FALLO_AUTOMATICO
    );
}
export function normal(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(1, 1),
        tokenSpecDef(0, 3),
        tokenSpecDef(-1, 1),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 1),
        tokenSpecDef(-5, 1),
        tokenSpecDef(0, 2, true, "Calavera"),
        tokenSpecDef(0, 1, true, "Antiguo"),
        FALLO_AUTOMATICO
    );
}
function hard (): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(1, 1),
        tokenSpecDef(0, 2),
        tokenSpecDef(-1, 1),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 2),
        tokenSpecDef(-4, 1),
        tokenSpecDef(-6, 1),
        tokenSpecDef(0, 2, true, "Calavera"),
        tokenSpecDef(0, 1, true, "Antiguo"),
        FALLO_AUTOMATICO
    );
}

function expert (): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(0, 1),
        tokenSpecDef(-1, 1),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 2),
        tokenSpecDef(-4, 2),
        tokenSpecDef(-6, 1),
        tokenSpecDef(-8, 1),
        tokenSpecDef(0, 2, true, "Calavera"),
        tokenSpecDef(0, 1, true, "Antiguo"),
        FALLO_AUTOMATICO
    );
}

function NaturalezaSalvaje(): IScenarioSpec {
    const PUNTOS_DE_VENGANZA="Vengeance points";
    const LUGARES_EN_JUEGO="Locations in play";
    const CARTAS_EXPLORACION="Cards in exploration deck";
    const ENVENENADO="Poisoned";

    return {
        name: "The Untamed Wilds",
        translations: {
            "es": "Naturaleza Salvaje"
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "Calavera", effect: (tokenBag) => 0 - (tokenBag.context[PUNTOS_DE_VENGANZA] as number)},
            {name: "Sectario", effect: (tokenBag) => 0 - Math.min(5, tokenBag.context[LUGARES_EN_JUEGO] as number)},
            {name: "Lápida", effect: (tokenBag) => 0 - Math.min(5, tokenBag.context[CARTAS_EXPLORACION] as number)},
            {name: "Antiguo", effect: (tokenBag) => tokenBag.context[ENVENENADO] ? -99 : -2},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: PUNTOS_DE_VENGANZA,
                description: "Puntos de Venganza en la zona de victoria",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Puntos de venganza"
                }
            },{
                name: LUGARES_EN_JUEGO,
                description: "Lugares en juego",
                type: "number",
                initialValue: 1,
                translations: {
                    "es": "Lugares en juego"
                }
            },{
                name: CARTAS_EXPLORACION,
                description: "Lugares en el mazo de exploración",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Cartas en el mazo de exploración"
                }
            },{
                name: ENVENENADO,
                description: "Envenenado",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Envenenado"
                }
            }]
        }
    };
}

function LaPerdicionDeEztli(): IScenarioSpec {
    const FICHAS_PERDICION="Locations with doom";
    const PERDICION_EN_TU_LUGAR="Doom on your location";
    function fichas(tokenBag: TokenBag) {
        return 0 - (tokenBag.context[FICHAS_PERDICION] as  number);
    }
    return {
        name: "The Doom of Eztli",
        translations: {
            "es": "La perdición de Eztli",
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "Calavera", effect: (tokenBag) => tokenBag.context[PERDICION_EN_TU_LUGAR] ? -3 : -1},
            {name: "Sectario", effect: (tokenBag) => fichas(tokenBag)},
            {name: "Lápida", effect: (tokenBag) => fichas(tokenBag)},
            {name: "Antiguo", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Antiguo"))},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: FICHAS_PERDICION,
                description: "Number of locations with doom on them",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Lugares con perdición"
                }
            },{
                name: PERDICION_EN_TU_LUGAR,
                description: "Doom on yout location",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Perdición en tu lugar"
                }
            }]
        }
    };
}

function LosHilosDelDestino(): IScenarioSpec {
    const MAYOR_PERDICION_EN_CULTISTA="Highest doom";
    return {
        name: "Threads of Fate",
        translations: {
            "es": "Los hilos del destino"
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "Calavera", effect: (tokenBag) => 0 - (tokenBag.context[MAYOR_PERDICION_EN_CULTISTA] as number)},
            {name: "Sectario", effect: (tokenBag) => -2},
            {name: "Lápida", effect: (tokenBag) => -2},
            {name: "Antiguo", effect: (tokenBag) => -2},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: MAYOR_PERDICION_EN_CULTISTA,
                description: "Highest number of doom in a cultist",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Mayor perdición en un cultista"
                }
            }]
        }
    };
}

function ElLimiteDelOtroLado(): IScenarioSpec {
    const LUGAR_ANTIGUO="Ancient location";
    return {
        name: "The Boundary Beyond",
        translations: {
            "es": "El límite del otro lado"
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "Calavera", effect: (tokenBag) => (tokenBag.context[LUGAR_ANTIGUO] as boolean) ? -3 : -1},
            {name: "Sectario", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Sectario"))},
            {name: "Lápida", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Lápida"))},
            {name: "Antiguo", effect: (tokenBag) => -4},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: LUGAR_ANTIGUO,
                description: "You are at an ancient location",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Lugar antiguo"
                }
            }]
        }
    };
}

function ElCorazonDeLosAncianos(): IScenarioSpec {
    const EN_UNA_CUEVA="Cave location";
    const ENVENENADO="Poisoned";
    return {
        name: "Heart of the Elders",
        translations: {
            "es": "El corazón de los ancianos"
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "Calavera", effect: (tokenBag) => (tokenBag.context[EN_UNA_CUEVA] as boolean) ? -3 : -1},
            {name: "Sectario", effect: (tokenBag) => -2},
            {name: "Lápida", effect: (tokenBag) => (tokenBag.context[ENVENENADO] as boolean) ? -99 : -2},
            {name: "Antiguo", effect: (tokenBag) => -3},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: EN_UNA_CUEVA,
                description: "You are at in a cave location",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Lugar cueva"
                }
            },{
                name: ENVENENADO,
                description: "You are poisoned",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Envenenado"
                }
            }]
        }
    };
}

function LaCiudadDeLosArchivos(): IScenarioSpec {
    const CARTAS_EN_LA_MANO="Cards in hand";

    return {
        name: "The City of Archives",
        translations: {
            "es": "La ciudad de los archivos"
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "Calavera", effect: (tokenBag) => (tokenBag.context[CARTAS_EN_LA_MANO] as number) >= 5 ? -3 : -1},
            {name: "Sectario", effect: (tokenBag) => -2},
            {name: "Lápida", effect: (tokenBag) => -2},
            {name: "Antiguo", effect: (tokenBag) => -3},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: CARTAS_EN_LA_MANO,
                description: "Cards in hand",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Cartas en la mano"
                }
            }]
        }
    };
}

function LasProfundidadesDeYoth(): IScenarioSpec {
    const NIVEL_DE_PROFUNDIDAD="Depth level";
    const PUNTOS_DE_VENGANZA="Vengeance points";
    return {
        name: "The Depths of Yoth",
        translations: {
            "es": "Las profundidades de Yoth"
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "Calavera", effect: (tokenBag) => 0 - (tokenBag.context[NIVEL_DE_PROFUNDIDAD] as number)},
            {name: "Sectario", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Sectario"))},
            {name: "Lápida", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Lápida"))},
            {name: "Antiguo", effect: (tokenBag) => (tokenBag.context[PUNTOS_DE_VENGANZA] as number) >= 3 ? -99 : -2},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: NIVEL_DE_PROFUNDIDAD,
                description: "Current Depth level",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Nivel de profundidad"
                }
            },{
                name: PUNTOS_DE_VENGANZA,
                description: "Vengeance points in the victory display",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Puntos de venganza"
                }
            }]
        }
    };
}

function EonesDestozados(): IScenarioSpec {
    const RELIQUIA_DE_LAS_ERAS_EN_TU_LUGAR="Relic of ages at your location";
    const ENVENENADO="Poisoned";
    return {
        name: "Shattered Aeons",
        translations: {
            "es": "Eones destrozados"
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "Calavera", effect: (tokenBag) => (tokenBag.context[RELIQUIA_DE_LAS_ERAS_EN_TU_LUGAR] as boolean) ? -4 : -2},
            {name: "Sectario", effect: (tokenBag) => -2},
            {name: "Lápida", effect: (tokenBag) => (tokenBag.context[ENVENENADO] as boolean) ? -99 : -2},
            {name: "Antiguo", effect: (tokenBag) => -2},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: RELIQUIA_DE_LAS_ERAS_EN_TU_LUGAR,
                description: "Relic of ages at your location",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Reliquia de las eras en tu lugar"
                }
            },{
                name: ENVENENADO,
                description: "You are poisoned",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Envenenado"
                }
            }]
        }
    };
}

export function buildLaEraOlvidadaCampaignSpec(): ICampaignSpec {
    return {
        id: "TheForgottenAge",
        name: "The Forgotten Age",
        scenarios: [
            NaturalezaSalvaje(),LaPerdicionDeEztli(), LosHilosDelDestino(), ElLimiteDelOtroLado(),
            ElCorazonDeLosAncianos(), LaCiudadDeLosArchivos(), LasProfundidadesDeYoth(), EonesDestozados()
        ],
        bagSpecsByLevel: {
            easy: easy(),
            normal: normal(),
            hard: hard(),
            expert: expert(),
        },
        translations: {
            "es": "La Era Olvidada",
        }
    }
}

export function startAlvaroLaEraOlvidada() {
    const campaign = Campaign.start(buildLaEraOlvidadaCampaignSpec(), [
        AHCharacters["LeoAnderson"], AHCharacters["DianaStanley"],
    ], "normal");
    campaign.startCampaign(0);
    return campaign;
}

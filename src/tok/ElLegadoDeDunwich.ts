import {
    addTokens,
    buildBagSpec,
    FALLO_AUTOMATICO,
    removeToken, seal,
    tokenAverage,
    TokenBagSpec,
    tokenSpecDef
} from "./Token";
import {IScenarioSpec} from "./Scenario";
import {ICampaignSpec} from "./Campaign";

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

function ActividadExtracurricular(): IScenarioSpec {
    const CARDS_IN_DISCARD_PILE="Cards in your discard pile";
    const COST_OF_DISCARED_CARDS="Printed cost of discarded cards";
    return {
        name: "Extracurricular Activiry",
        translations: {
            "es": "Actividad extracurricular",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => -1},
            {name: "Sectario", effect: (tokenBag) => tokenBag.context[CARDS_IN_DISCARD_PILE] >= 10 ? -3 : -1},
            {name: "Antiguo", effect: (tokenBag) => -tokenBag.context[COST_OF_DISCARED_CARDS]},
        ],
        contextSpec: {
            valuesSpec: [{
                name: CARDS_IN_DISCARD_PILE,
                description: "Cards in your discard pile",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Cartas en tu pila de descarte"
                }
            }, {
                name: COST_OF_DISCARED_CARDS,
                description: "Discard two cards X is the total printed cost of those discarded cardfs",
                type: "number",
                initialValue: 3,
                translations: {
                    "es": "Coste impreso de las cartas descartadas"
                }
            }
            ]
        }
    };
}

function LaCasaSiempreGana(): IScenarioSpec {
    const SPEND_2_RESOURCES="Spend 2 resources to treat skull token as 0";
    return {
        name: "The House Always Win",
        translations: {
            "es": "La casa siempre gana",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => tokenBag.context[SPEND_2_RESOURCES] ? 0 : -2},
            {name: "Sectario", effect: (tokenBag) => -3},
            {name: "Lápida", effect: (tokenBag) => -2},
        ],
        contextSpec: {
            valuesSpec: [{
                name: SPEND_2_RESOURCES,
                description: "You may spend 2 resources to treat this token as a 0, instead.",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Gasta 2 recursos para tratar la calavera como un token 0"
                }
            }]
        }
    };
}

function ElMuseoMiskatonic(): IScenarioSpec {
    const HAUNTING_HORROR_AT_YOUR_LOCATION="Haunting horror at your location";
    return {
        name: "The Miskatonic Museum",
        translations: {
            "es": "El Museo Miskatonic",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => tokenBag.context[HAUNTING_HORROR_AT_YOUR_LOCATION] ? -3 : -1},
            {name: "Sectario", effect: (tokenBag) => -1},
            {name: "Lápida", effect: (tokenBag) => -2},
            {name: "Antiguo", effect: (tokenBag) => -3},
        ],
        contextSpec: {
            valuesSpec: [{
                name: HAUNTING_HORROR_AT_YOUR_LOCATION,
                description: "Haunting horror at your location",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Horrendo cazador está en tu Lugar"
                }
            }]
        }
    };
}

function ElEssexCountyExpress(): IScenarioSpec {
    const CURRENT_AGENDA="Current Agenda #";
    return {
        name: "Essex County Express",
        translations: {
            "es": "El Essex County Express",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => -tokenBag.context[CURRENT_AGENDA]},
            {name: "Sectario", effect: (tokenBag) => -1},
            {name: "Lápida", effect: (tokenBag) => -2},
            {name: "Antiguo", effect: (tokenBag) => -3},
        ],
        contextSpec: {
            valuesSpec: [{
                name: CURRENT_AGENDA,
                description: "",
                type: "number",
                initialValue: 1,
                translations: {
                    "es": "Número de plan en curso"
                }
            }]
        }
    };
}

function SangreEnElAltar(): IScenarioSpec {
    const LOCATION_WITHOUT="Location cards in play with no card underneath";
    return {
        name: "Blood on the Altar",
        translations: {
            "es": "Sangre en el altar",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => -Math.min(4, tokenBag.context[LOCATION_WITHOUT] as number)},
            {name: "Sectario", effect: (tokenBag) => -2},
            {name: "Lápida", effect: (tokenBag) => -2},
            {name: "Antiguo", effect: (tokenBag) => -3},
        ],
        contextSpec: {
            valuesSpec: [{
                name: LOCATION_WITHOUT,
                description: "Location cards in play with no card underneath",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Lugares sin ninguna carta debajo"
                }
            }]
        }
    };
}

function InvisiblesYSinDimension(): IScenarioSpec {
    const BROOD_IN_PLAY="Brood in play";
    const REMOVE_A_CLUE_FROM_BROOD="Remove all clue tokens from a Brood";
    return {
        name: "Undimensioned and Unseen",
        translations: {
            "es": "Invisibles y sin dimension",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => -tokenBag.context[BROOD_IN_PLAY]},
            {name: "Sectario", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Sectario"))},
            {name: "Lápida", effect: (tokenBag) => tokenBag.context[REMOVE_A_CLUE_FROM_BROOD] ? 0 : -4},
            {name: "Antiguo", effect: (tokenBag) => -3},
        ],
        contextSpec: {
            valuesSpec: [{
                name: BROOD_IN_PLAY,
                description: "Brood of Yog-Sothoth in play",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Progenies en juego"
                }
            },{
                name: REMOVE_A_CLUE_FROM_BROOD,
                description: "Remove all clue tokens from a Brood",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Retirar todas las fichas de Pista de una Progenie"
                }
            }]
        }
    };
}

function DondeAguardaLaPerdicion(): IScenarioSpec {
    const ALTERED_LOCATION="Altered location";
    const AGENDA_2="Agenda 2";
    const COST_OF_DISCARED_CARDS="Printed cost of discarded cards";
    return {
        name: "Where Doom Awaits",
        translations: {
            "es": "Donde aguarda la perdición",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => tokenBag.context[ALTERED_LOCATION] ? -3 : -1},
            {name: "Sectario", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Sectario"))},
            {name: "Lápida", effect: (tokenBag) => tokenBag.context[AGENDA_2] ? -4 : -2},
            {name: "Antiguo", effect: (tokenBag) => -tokenBag.context[COST_OF_DISCARED_CARDS]},
        ],
        contextSpec: {
            valuesSpec: [{
                name: ALTERED_LOCATION,
                description: "At an altered location",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Lugar Alterado"
                }
            }, {
                name: AGENDA_2,
                description: "It's agenda 2",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Plan 2"
                }
            }, {
                name: COST_OF_DISCARED_CARDS,
                description: "Discard two cards X is the total printed cost of those discarded cardfs",
                type: "number",
                initialValue: 3,
                translations: {
                    "es": "Coste impreso de las cartas descartadas"
                }
            }]
        }
    };
}

function PerdidosEnElTiempoYEnElEspacio(): IScenarioSpec {
    const EXTRADIMENSIONAL_LOCATIONS="Extradimensional locations";
    const SHROUD="Shroud of your location"
    return {
        name: "Lost in Time and Space",
        translations: {
            "es": "Perdidos en el tiempo y en el espacio",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => -tokenBag.context[EXTRADIMENSIONAL_LOCATIONS]},
            {name: "Sectario", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Sectario"))},
            {name: "Lápida", effect: (tokenBag) => -3},
            {name: "Antiguo", effect: (tokenBag) => -tokenBag.context[SHROUD]},
        ],
        contextSpec: {
            valuesSpec: [{
                name: EXTRADIMENSIONAL_LOCATIONS,
                description: "Extradimensional locations in play",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Lugares Extradimensionales"
                }
            },{
                name: SHROUD,
                description: "Shroud value of your location",
                type: "number",
                initialValue: 2,
                translations: {
                    "es": "Velo de tu lugar"
                }
            }]
        }
    };
}

export function buildElLegadoDeDunwichCampaignSpec(): ICampaignSpec {
    return {
        id: "TheDunwichLegacy",
        name: "The Dunwich Legacy",
        scenarios: [
            ActividadExtracurricular(), LaCasaSiempreGana(), ElMuseoMiskatonic(), ElEssexCountyExpress(),
            SangreEnElAltar(), InvisiblesYSinDimension(), DondeAguardaLaPerdicion(), PerdidosEnElTiempoYEnElEspacio()
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
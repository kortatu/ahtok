import {
    addTokens,
    buildBagSpec,
    FALLO_AUTOMATICO,
    removeToken, seal,
    tokenAverage, TokenBag,
    TokenBagSpec,
    tokenSpecDef
} from "./Token";
import {AHLevel, Campaign, ICampaignSpec} from "./Campaign";
import {IScenarioSpec} from "./Scenario";
import {AHCharacter, AHCharacters} from "./AHCharacter";


function easy(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(1, 2),
        tokenSpecDef(0, 3),
        tokenSpecDef(-1, 2),
        tokenSpecDef(-2,1),
        tokenSpecDef(-3, 1),
        tokenSpecDef(0, 2, true, "Calavera"),
        FALLO_AUTOMATICO
    );
}
export function normal(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(1, 1),
        tokenSpecDef(0, 2),
        tokenSpecDef(-1, 2),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 1),
        tokenSpecDef(-4, 1),
        tokenSpecDef(0, 2, true, "Calavera"),
        FALLO_AUTOMATICO
        );
}
function hard (): TokenBagSpec {
    return addTokens(
            removeToken(normal(), "1"),
            tokenSpecDef(-5, 1),
    )
}

function expert (): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(0, 1),
        tokenSpecDef(-1, 2),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 1),
        tokenSpecDef(-4, 1),
        tokenSpecDef(-6, 1),
        tokenSpecDef(-8, 1),
        tokenSpecDef(0, 2, true, "Calavera"),
        FALLO_AUTOMATICO
    );
}

function Prologo(): IScenarioSpec {
    return {
        name: "Disappearance at the Twilight Estate",
        translations: {
            "es": "Desaparición en la finca del crepúsculo",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: () => -3},
        ],
        contextSpec: {
            valuesSpec: []
        }
    };
}

function LaHoraBruja(): IScenarioSpec {
    return {
        name: "The Witching Hour",
        translations: {
            "es": "La hora bruja"
        },
        scenarioEffectSpec: [
            { name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag) },
            { name: "Calavera", effect: () => -1 },
            { name: "Lápida", effect: () => -3 },
            { name: "Antiguo", effect: () => -3 },
        ],
        contextSpec: {
            valuesSpec: []
        }
    }
}

function ALasPuertasDeLaMuerte(): IScenarioSpec {
    const HAUNTED_LOCATION = "Haunted location";
    return {
        name: "At Death's Doorstep",
        translations: {
            "es": "A las puertas de la muerte",
        },
        scenarioEffectSpec: [
            { name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag) },
            { name: "Calavera", effect: (tokenBag) => tokenBag.context[HAUNTED_LOCATION] ? -3 : -1 },
            { name: "Lápida", effect: () => -2 },
            { name: "Antiguo", effect: () => -2 },
        ],
        contextSpec: {
            valuesSpec: [{
                name: HAUNTED_LOCATION,
                description: "Haunted location",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Lugar embrujado"
                }
            }]
        }
    }
}

function ElNombreSecreto(): IScenarioSpec {
    const EXTRADIMENSIONAL_LOCATION = "Extradimensional location";
    return {
        name: "The Secret Name",
        translations: {
            "es": "El nombre secreto",
        },
        scenarioEffectSpec: [
            { name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag) },
            { name: "Calavera", effect: (tokenBag) => tokenBag.context[EXTRADIMENSIONAL_LOCATION] ? -3 : -1 },
            { name: "Sectario", effect: tokenBag => tokenAverage(seal(tokenBag, "Sectario"))},
            { name: "Lápida", effect: () => -2 },
            { name: "Antiguo", effect: () => -3 },
        ],
        contextSpec: {
            valuesSpec: [{
                name: EXTRADIMENSIONAL_LOCATION,
                description: "Extradimensional location",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Lugar Extradimensional"
                }
            }]
        }
    }
}

function LaPagaDelPecado(): IScenarioSpec {
    const UNFINISHED_BUSINESS = "Unfinished business";
    const FIGHTING_EVADING_HERETIC = "Fighting/evading Heretic";
    return {
        name: "The Wages of Sin",
        translations: {
            "es": "La paga del pecado",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => 0 - (tokenBag.context[UNFINISHED_BUSINESS] as number)},
            {name: "Sectario", effect: (tokenBag) => tokenBag.context[FIGHTING_EVADING_HERETIC] ? -4 : -3 },
            {name: "Lápida", effect: () => -3},
            {name: "Antiguo", effect: () => -2},
        ],
        contextSpec: {
            valuesSpec: [
                {
                    name: UNFINISHED_BUSINESS,
                    description: "Unfinished business",
                    type: "number",
                    initialValue: 0,
                    translations: {
                        "es": "Asuntos inconclusos",
                    }
                },
                {
                    name: FIGHTING_EVADING_HERETIC,
                    description: "Fighting/evading Heretic",
                    type: "boolean",
                    initialValue: false,
                    translations: {
                        "es": "Atacando/Evitando Hereje"
                    }
                }
            ]
        }
    };
}

function PorElBienComun(): IScenarioSpec {
    const MAXIMA_PERDICION = "Max Doom";
    return {
        name: "For the Greater Good",
        translations: {
            "es": "Por el bien común",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => 0 - (tokenBag.context[MAXIMA_PERDICION] as number)},
            {name: "Sectario", effect: tokenBag => tokenAverage(seal(tokenBag, "Sectario")) - 2},
            {name: "Lápida", effect: () => -3},
            {name: "Antiguo", effect: () => -3},
        ],
        contextSpec: {
            valuesSpec: [{
                name: MAXIMA_PERDICION,
                description: "Highest number of doom on a Cultist",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Máxima perdición"
                }
            }]
        }
    };
}

function UnionYDesilusion(): IScenarioSpec {
    const ACCION_CIRCULO = "Circle action";
    return {
        name: "Union and Disillusion",
        translations: {
            "es": "Unión y desilusión"
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) =>
                    tokenBag.context[ACCION_CIRCULO] ? tokenAverage(seal(tokenBag, "Calavera")) - 2 : -2},
            {name: "Sectario", effect: () => -3},
            {name: "Lápida", effect: () => -3},
            {name: "Antiguo", effect: () => -3},
        ],
        contextSpec: {
            valuesSpec: [{
                name: ACCION_CIRCULO,
                description: "This skill test is a circle action",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Acción círculo"
                }
            }]
        }
    };
}

function EnLasGarrasDelCaos(): IScenarioSpec {
    const PERDICION_Y_BRECHA = "Doom and breaches on your location";
    const getPerdicionYBrecha = (tokenBag: TokenBag) => {
        return tokenBag.context[PERDICION_Y_BRECHA] as number;
    }

    return {
        name: "In the Clutches of Chaos",
        translations: {
          "es": "En las garras del caos",
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => 0 - getPerdicionYBrecha(tokenBag)},
            {name: "Sectario", effect: (tokenBag) => {
                //Creates a new bag and a new context for this calculation
                    const potentialBag = seal(tokenBag, "Sectario");
                    potentialBag.context = {
                        [PERDICION_Y_BRECHA]: Math.max(3, getPerdicionYBrecha(tokenBag) + 1),
                    }
                    return tokenAverage(potentialBag);
                }},
            {name: "Lápida", effect: () => -2},
            {name: "Antiguo", effect: () => -3},
        ],
        contextSpec: {
            valuesSpec: [{
                name: PERDICION_Y_BRECHA,
                description: "Total amount of doom and breaches on your location",
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Perdición y brecha en tu lugar"
                }
            }]
        }
    };
}

function AnteElTronoNegro(): IScenarioSpec {
    const PERDICION_EN_AZATHOTH = "Doom on Azathoth";
    const getHalfDoomInAzathot = (tokenBag: TokenBag) => {
        return Math.ceil((tokenBag.context[PERDICION_EN_AZATHOTH] as number) / 2);
    }

    return {
        name: "Before the Black Throne",
        translations: {
            "es": "Ante el trono negro"
        },
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => 0 - Math.max(2, getHalfDoomInAzathot(tokenBag))},
            {name: "Sectario", effect: (tokenBag) => tokenAverage(seal(tokenBag, "Sectario"))},
            {name: "Lápida", effect: () => -2},
            {name: "Antiguo", effect: () => -4},
        ],
        contextSpec: {
            valuesSpec: [{
                name: PERDICION_EN_AZATHOTH,
                description: PERDICION_EN_AZATHOTH,
                type: "number",
                initialValue: 0,
                translations: {
                    "es": "Perdición en Azathoth"
                }
            }]
        }
    };
}

export function buildElCirculoRotoCampaignSpec(): ICampaignSpec {
    return {
        id: "TheCircleUndone",
        name: "The Circle Undone",
        scenarios: [
            Prologo(),
            LaHoraBruja(), ALasPuertasDeLaMuerte(), ElNombreSecreto(), LaPagaDelPecado(),
            PorElBienComun(), UnionYDesilusion(), EnLasGarrasDelCaos(), AnteElTronoNegro()
        ],
        bagSpecsByLevel: {
            easy: easy(),
            normal: normal(),
            hard: hard(),
            expert: expert(),
        },
        translations: {
            "es": "El círculo roto"
        }
    }
}

export function startElCirculoRoto(characters: AHCharacter[], level: AHLevel) {
    return Campaign.start(buildElCirculoRotoCampaignSpec(), characters, level);
}

export function startAlvaroElCirculoRotoLPDP() {
    const campaign = startElCirculoRoto([
        AHCharacters["JoeDiamond"], AHCharacters["DianaStanley"],
        // {name: "Joe Diamond", shortName: "Joe", elderSignEffect: () => 1},
        // {name: "Diana Stanley", shortName: "Diana", elderSignEffect: () => 2},
    ], "normal");
    campaign.addTokensToBagSpec(
        tokenSpecDef(0, 2, true, "Lápida"), // <- La hora bruja: Los inv han aceptado su destino
        tokenSpecDef(0, 1, true, "Sectario"), // <- El precio del progreso, unirme a la logia
        tokenSpecDef(0, 1, true, "Calavera"), // <- El nombre secreto, coger el Libro Negro
        // tokenSpecDef(0, 1, true, "Antiguo"),
        // tokenSpecDef(-5, 1, false),
    );
    campaign.startCampaign(0);
    return campaign;
}
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
import {AHCharacter} from "./AHCharacter";


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
        name: "Desaparición en la finca del crepúsculo",
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
        name: "La hora bruja",
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
    return {
        name: "A las puertas de la muerte",
        scenarioEffectSpec: [
            { name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag) },
            { name: "Calavera", effect: (tokenBag) => tokenBag.context["Lugar Embrujado"] ? -3 : -1 },
            { name: "Lápida", effect: () => -2 },
            { name: "Antiguo", effect: () => -2 },
        ],
        contextSpec: {
            valuesSpec: [{
                name: "Lugar Embrujado",
                description: "Lugar Embrujado",
                type: "boolean",
                initialValue: false
            }]
        }
    }
}

function ElNombreSecreto(): IScenarioSpec {
    return {
        name: "El nombre secreto",
        scenarioEffectSpec: [
            { name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag) },
            { name: "Calavera", effect: (tokenBag) => tokenBag.context["Lugar Extradimensional"] ? -3 : -1 },
            { name: "Sectario", effect: tokenBag => tokenAverage(seal(tokenBag, "Sectario"))},
            { name: "Lápida", effect: () => -2 },
            { name: "Antiguo", effect: () => -3 },
        ],
        contextSpec: {
            valuesSpec: [{
                name: "Lugar Extradimensional",
                description: "Lugar Extradimensional",
                type: "boolean",
                initialValue: false
            }]
        }
    }
}

function LaPagaDelPecado(): IScenarioSpec {
    return {
        name: "La paga del pecado",
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => 0 - (tokenBag.context["Asuntos inconclusos"] as number)},
            {name: "Sectario", effect: (tokenBag) => tokenBag.context["Atacando/Evitando Hereje"] ? -4 : -3 },
            {name: "Lápida", effect: () => -3},
            {name: "Antiguo", effect: () => -2},
        ],
        contextSpec: {
            valuesSpec: [
                {
                name: "Asuntos inconclusos",
                description: "Asuntos inconclusos",
                type: "number",
                initialValue: 0
                 },
                {
                    name: "Atacando/Evitando Hereje",
                    description: "Atacando/Evitando Hereje",
                    type: "boolean",
                    initialValue: false
                }
            ]
        }
    };
}

function PorElBienComun(): IScenarioSpec {
    const MAXIMA_PERDICION = "Máxima Perdición";
    return {
        name: "Por el bien común",
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
                description: MAXIMA_PERDICION,
                type: "number",
                initialValue: 0
            }]
        }
    };
}

function UnionYDesilusion(): IScenarioSpec {
    const ACCION_CIRCULO = "Acción círculo";
    return {
        name: "Unión y desilusión",
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
                description: ACCION_CIRCULO,
                type: "boolean",
                initialValue: false
            }]
        }
    };
}

function EnLasGarrasDelCaos(): IScenarioSpec {
    const PERDICION_Y_BRECHA = "Perdición y brecha en tu lugar";
    const getPerdicionYBrecha = (tokenBag: TokenBag) => {
        return tokenBag.context[PERDICION_Y_BRECHA] as number;
    }

    return {
        name: "En las garras del caos",
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
                description: PERDICION_Y_BRECHA,
                type: "number",
                initialValue: 0
            }]
        }
    };
}

function AnteElTronoNegro(): IScenarioSpec {
    const PERDICION_EN_AZATHOTH = "Perdición en Azathoth";
    const getHalfDoomInAzathot = (tokenBag: TokenBag) => {
        return Math.ceil((tokenBag.context[PERDICION_EN_AZATHOTH] as number) / 2);
    }

    return {
        name: "Ante el trono negro",
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
                initialValue: 0
            }]
        }
    };
}

function buildElCirculoRotoCampaignSpec(): ICampaignSpec {
    return {
        name: "El círculo roto",
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
        }
    }
}

export function startElCirculoRoto(characters: AHCharacter[], level: AHLevel) {
    return new Campaign(buildElCirculoRotoCampaignSpec(), characters, level);
}

export function startAlvaroElCirculoRotoLPDP() {
    const campaign = startElCirculoRoto([
        {name: "Joe Diamond", shortName: "Joe", elderSignEffect: () => 1},
        {name: "Diana Stanley", shortName: "Diana", elderSignEffect: () => 2},
    ], "normal");
    campaign.addTokensToBagSpec(
        tokenSpecDef(0, 2, true, "Lápida"), // <- La hora bruja: Los inv han aceptado su destino
        tokenSpecDef(0, 1, true, "Sectario"), // <- El precio del progreso, unirme a la logia
        tokenSpecDef(0, 1, true, "Calavera"), // <- El nombre secreto, coger el Libro Negro
        // tokenSpecDef(0, 1, true, "Antiguo"),
        // tokenSpecDef(-5, 1, false),
    );
    campaign.startCampaign(6);
    return campaign;
}
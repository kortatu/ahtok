import {
    addTokens,
    buildBagSpec,
    FALLO_AUTOMATICO,
    removeToken, seal,
    tokenAverage, TokenBag,
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
    const PUNTOS_DE_VENGANZA="PUNTO_DE_VENGANZA";
    const LUGARES_EN_JUEGO="LUGARES_EN_JUEGO";
    const CARTAS_EXPLORACION="CARTAS_EXPLORACION";
    const ENVENENADO="ENVENENADO";
    return {
        name: "Naturaleza Salvaje",
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => -1 - (tokenBag.context[PUNTOS_DE_VENGANZA] as number)},
            {name: "Sectario", effect: (tokenBag) => 0 - (tokenBag.context[LUGARES_EN_JUEGO] as number)},
            {name: "Lápida", effect: (tokenBag) => 0 - Math.min(3, tokenBag.context[CARTAS_EXPLORACION] as number)},
            {name: "Antiguo", effect: (tokenBag) => tokenBag.context[ENVENENADO] ? -99 : -3},
        ],
        contextSpec: {
            valuesSpec: [{
                name: PUNTOS_DE_VENGANZA,
                description: "Puntos de Venganza en la zona de victoria",
                type: "number",
                initialValue: 0
            },{
                name: LUGARES_EN_JUEGO,
                description: "Lugares en juego",
                type: "number",
                initialValue: 1
            },{
                name: CARTAS_EXPLORACION,
                description: "Lugares en el mazo de exploración",
                type: "number",
                initialValue: 0
            },{
                name: ENVENENADO,
                description: "Envenenado",
                type: "boolean",
                initialValue: false
            }]
        }
    };
}

function LaPerdicionDeEztli(): IScenarioSpec {
    const FICHAS_PERDICION="FICHAS_PERDICION";
    const PERDICION_EN_TU_LUGAR="PERDICION_EN_TU_LUGAR";
    function fichas(tokenBag: TokenBag) {
        return 0 - (tokenBag.context[FICHAS_PERDICION] as  number);
    }
    return {
        name: "La perdición de Eztli",
        scenarioEffectSpec: [
            {name: "elderSign", effect: (tokenBag) => tokenBag.context[PERDICION_EN_TU_LUGAR] ? -4 : -2},
            {name: "Calavera", effect: (tokenBag) => fichas(tokenBag)},
            {name: "Sectario", effect: (tokenBag) => fichas(tokenBag)},
            {name: "Lápida", effect: (tokenBag) => fichas(tokenBag)},
            {name: "Antiguo", effect: (tokenBag) => {
                    let potentialBag = seal(tokenBag, "Antiguo");
                    potentialBag.context[PERDICION_EN_TU_LUGAR] = true;
                    potentialBag.context[FICHAS_PERDICION] = potentialBag.context[FICHAS_PERDICION] as number + 1;
                    return tokenAverage(potentialBag);
                }},
        ],
        contextSpec: {
            valuesSpec: [{
                name: FICHAS_PERDICION,
                description: "Fichas de perdición sobre Lugares",
                type: "number",
                initialValue: 0
            },{
                name: PERDICION_EN_TU_LUGAR,
                description: "Perdición en tu lugar",
                type: "boolean",
                initialValue: false
            }]
        }
    };
}

export function buildLaEraOlvidadaCampaignSpec(): ICampaignSpec {
    return {
        id: "TheForgottenAge",
        name: "La Era Olvidada",
        scenarios: [
            NaturalezaSalvaje(),NaturalezaSalvaje()
        ],
        bagSpecsByLevel: {
            easy: easy(),
            normal: normal(),
            hard: hard(),
            expert: expert(),
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

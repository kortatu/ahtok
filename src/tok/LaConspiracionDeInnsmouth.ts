import {
    buildBagSpec, commonTokenEffectSpec,
    FALLO_AUTOMATICO,
    ScenarioEffectSpecs,
    seal,
    tokenAverage,
    TokenBag,
    TokenBagSpec,
    tokenSpecDef
} from "./Token";
import {ICampaignSpec} from "./Campaign";
import {IScenarioSpec} from "./Scenario";

//TODO
function easy(): TokenBagSpec {
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
function normal(): TokenBagSpec {
    return buildBagSpec(
        tokenSpecDef(1, 1, false, "elderSign"),
        tokenSpecDef(1, 1),
        tokenSpecDef(0, 2),
        tokenSpecDef(-1, 3),
        tokenSpecDef(-2,2),
        tokenSpecDef(-3, 1),
        tokenSpecDef(-4, 1),
        tokenSpecDef(0, 2, true, "Sectario"),
        tokenSpecDef(0, 2, true, "Lápida"),
        tokenSpecDef(0, 2, true, "Calavera"),
        tokenSpecDef(0, 2, true, "Antiguo"),
        FALLO_AUTOMATICO
    );
}

//TODO
function hard(): TokenBagSpec {
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

//TODO
function expert(): TokenBagSpec {
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



function ElPozoDeLaDesesperacion(): IScenarioSpec {
    const PARTIALLY_FLOODED="Partially flooded location";
    const FLOODED="Fully flooded location";

    function floodedModifier(tokenBag: TokenBag): number {
        return tokenBag.context[FLOODED] as boolean ? -3 :
            (tokenBag.context[PARTIALLY_FLOODED] as boolean ? -2 : -1);
    }

    return {
        name: "The Pit of Despair",
        translations: {
            "es": "El pozo de la desesperación",
        },
        scenarioEffectSpec: commonTokenEffectSpec().concat([
            {name: "elderSign", effect: (tokenBag) => tokenBag.character.elderSignEffect(tokenBag)},
            {name: "Calavera", effect: (tokenBag) => floodedModifier(tokenBag) },
            {name: "Sectario", effect: (tokenBag) => -2},
            {name: "Lápida", effect: (_) => -2},
            {name: "Antiguo", effect: (_) => -3},
        ]),
        contextSpec: {
            valuesSpec: [{
                name: PARTIALLY_FLOODED,
                description: "Your location is partially flooded",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Lugar parcialmente inundado"
                }
            }, {
                name: FLOODED,
                description: "Your location is flooded",
                type: "boolean",
                initialValue: false,
                translations: {
                    "es": "Lugar inundado"
                }
            }
            ]
        }
    };
}


export function buildConspiraciondeInnsmouthCampaignSpec(): ICampaignSpec {
    return {
        id: "InnsmouthConspiracy",
        name: "The Innsmouth Conspiracy",
        scenarios: [
            ElPozoDeLaDesesperacion()
        ],
        bagSpecsByLevel: {
            easy: easy(),
            normal: normal(),
            hard: hard(),
            expert: expert(),
        },
        translations: {
            "es": "La conspiración de Innsmouth"
        }
    }
}

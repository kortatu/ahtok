import {EffectSpec} from "./Token";

export interface AHCharacter {
    id: string,
    name: string;
    shortName: string;
    elderSignEffect: EffectSpec;
}


export const AHCharacters: {[key: string]: AHCharacter} = {
    JoeDiamond: {id: "JoeDiamond", name: "Joe Diamond", shortName: "Joe", elderSignEffect: () => 1},
    DianaStanley: {id: "DianaStanley", name: "Diana Stanley", shortName: "Diana", elderSignEffect: () => 2},
    LeoAnderson: {id: "LeoAnderson", name: "Leo Anderson", shortName: "Leo", elderSignEffect: () => 2},
    UrsulaDowns: {id: "UrsulaDowns", name: "Ursula Downs", shortName: "Ursula", elderSignEffect: () => 2},
    LolaHayes: {id: "LolaHayes", name: "Lola Hayes", shortName: "Lola", elderSignEffect: () => 2},
}
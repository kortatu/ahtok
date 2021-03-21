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
    LukeRobinson: {id: "LukeRobinson", name: "Luke Robinson", shortName: "Luke", elderSignEffect: () => 1},
    MandyThompson: {id: "MandyThompson", name: "Mandy Thompson", shortName: "Mandy", elderSignEffect: () => 0},
    TonyMorgan: {id: "TonyMorgan", name: "Tony Morgan", shortName: "Tony", elderSignEffect: () => 2},
    PatriceHathaway: {id: "PatriceHathaway", name: "Patrice Hathaway", shortName: "Patrice", elderSignEffect: () => 1},
    SisterMary: {id: "SisterMary", name: "Sister Mary", shortName: "Mary", elderSignEffect: () => 1},
    TrishScarborough: {id: "TrishScarborough", name: "Trish Scarborough", shortName: "Trish", elderSignEffect: () => 2},
    DexterDrake: {id: "DexterDrake", name: "Dexter Drake", shortName: "Dexter", elderSignEffect: () => 2},
}
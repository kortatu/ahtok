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
}
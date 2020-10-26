import {Scenario} from "./Scenario";
import {PassZone} from "./PassZone";
import React, {CSSProperties, useState} from "react";
import {allTokens, Token, tokenAverage, TokenBagPassZone, TokenSpec} from "./Token";
import {AHCharacter} from "./AHCharacter";
import {ContextValueChanger, NumericParamChanger} from "./ParamChanger";
import {TokenSpan} from "./TokenSpan";

export function ScenarioPassZone(props: {scenario: Scenario, setScenario: (newS: Scenario) => void}) {
    const scenario = props.scenario;
    const [character, setCharacter] = useState<AHCharacter>(scenario.getCharacter());
    scenario.setCharacter(character);
    const setScenario = props.setScenario;
    const characters = scenario.characters;
    const context = scenario.currentContext;
    const bag: TokenBagPassZone = scenario.tokenBagPassZone();

    const findCharacterByShortName = (shortName: string) => {
        return characters.find(c => c.shortName === shortName);
    }

    return (
        <div className="Scenario">
            <h3>
               Escenario: {scenario.name()}
            </h3>
            <div>
                <div>
                    { Object.keys(context).map( contextKey => (
                        <ContextValueChanger key={contextKey} name={contextKey} currentValue={context[contextKey]}
                                             scenario={scenario} setScenario={setScenario} />
                    ))}
                </div>
            </div>
            <div>
               Personaje actual:
               <select style={{verticalAlign: "middle"}} defaultValue={character.shortName} onChange={e => setCharacter(findCharacterByShortName(e.target.value as string)!)}>
                   {characters.map( aChar => (
                       <option key={aChar.shortName} value={aChar.shortName}>{aChar.shortName}</option>
                   ))}
               </select>
            </div>

            <PassZone passZone={bag} />
            <div className="BagDisplay">
                Bag average: {tokenAverage(bag.tokenBag)}
                <p className="TokenStrip">{allTokens(bag.tokenBag).map((token, index) => (
                    <TokenSpan key={index} token={token} />
                ))}
                </p>
            </div>
        </div>
    );
}


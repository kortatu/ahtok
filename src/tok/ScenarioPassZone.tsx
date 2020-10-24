import {Scenario} from "./Scenario";
import {PassZone} from "./PassZone";
import React, {CSSProperties, useState} from "react";
import {allTokens, Token, TokenBagPassZone, TokenSpec} from "./Token";
import {AHCharacter} from "./AHCharacter";
import {ParamChanger} from "./ParamChanger";

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

    let tokensStyle: CSSProperties = {
        fontSize: "xx-large",

    };
    return (
        <div className="Scenario">
            <h3>
               Escenario: {scenario.name()}
            </h3>
            <div>
                <div>
                    { Object.keys(context).map( contextKey => (
                        <ParamChanger key={contextKey} name={contextKey} currentValue={context[contextKey]}
                                      incValue={() => setScenario(scenario.incContextValue(contextKey))}
                                      decValue={() => setScenario(scenario.decContextValue(contextKey))} />
                    ))}
                </div>
            </div>
            <div>
               Personaje actual:
               <select defaultValue={character.shortName} onChange={e => setCharacter(findCharacterByShortName(e.target.value as string)!)}>
                   {characters.map( aChar => (
                       <option key={aChar.shortName} value={aChar.shortName}>{aChar.shortName}</option>
                   ))}
               </select>
            </div>

            <PassZone bag={bag} />
            <div>
                <p style={tokensStyle}>{allTokens(bag.tokenBag).map((token, index) => (
                    <TokenSpan key={index} token={token} />
                ))}
                </p>
            </div>
        </div>
    );
}

function TokenSpan(props: {token: TokenSpec}){
    return <span className={"Token " + props.token.name}>T</span>
}
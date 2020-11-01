import React from "react";
import {Scenario} from "./Scenario";
import {CurrentPassZone} from "./PassZone";
import {allTokens, TokenBag, tokenFloatAverage} from "./Token";
import {TokenSpan} from "./TokenSpan";
import {Typography} from "@material-ui/core";
import {CurrentCharacterSelector} from "./CharacterSelector";
import {connect} from "react-redux";
import {AppState} from "../AppState";
import {CurrentScenarioContextManager} from "./ContextManager";


const mapStateToProps = (state: AppState) => ({scenario: state.selectedScenario});

export const CurrentScenarioPassZone = connect(mapStateToProps)(ScenarioPassZone);
export function ScenarioPassZone(props: {scenario: Scenario}) {
    const scenario = props.scenario;
    return (
        <div className="Scenario">
            <div className="ScenarioInfo">
                <Typography variant="h3">{scenario.name()}</Typography>
                <CurrentScenarioContextManager />
                <CurrentCharacterSelector />
            </div>
            <CurrentPassZone />
            <BagDisplay tokenBag={scenario.tokenBag} />
        </div>
    );
}

function BagDisplay({tokenBag}: {tokenBag: TokenBag}) {
    return <div className="BagDisplay">
        <Typography>Bag average: {tokenFloatAverage(tokenBag)}</Typography>
        <p className="TokenStrip">
            {allTokens(tokenBag).map((token, index) => (
                <TokenSpan key={index} token={token}/>
            ))}
        </p>
    </div>
}


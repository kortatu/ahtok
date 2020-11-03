import React from "react";
import {IScenarioSpec} from "./Scenario";
import {CurrentPassZone} from "./PassZone";
import {allTokens, TokenBag, tokenFloatAverage} from "./Token";
import {TokenSpan} from "./TokenSpan";
import {Typography} from "@material-ui/core";
import {CurrentCharacterSelector} from "./CharacterSelector";
import {connect} from "react-redux";
import {AppState, buildBagFromState} from "../AppState";
import {CurrentScenarioContextManager} from "./ContextManager";


const mapStateToProps = (state: AppState) => ({tokenBag: buildBagFromState(state), scenario: state.selectedScenario});

export const CurrentScenarioPassZone = connect(mapStateToProps)(ScenarioPassZone);

export function ScenarioPassZone({tokenBag, scenario}: {tokenBag: TokenBag, scenario: IScenarioSpec}) {
    return (
        <div className="Scenario">
            <div className="ScenarioInfo">
                <Typography variant="h3">{scenario.name}</Typography>
                <CurrentScenarioContextManager />
                <CurrentCharacterSelector />
            </div>
            <CurrentPassZone tokenBag={tokenBag}/>
            <BagDisplay tokenBag={tokenBag} />
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


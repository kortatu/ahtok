import {connect} from "react-redux";
import {AppState} from "../AppState";
import React, {Dispatch} from "react";
import {
    IContextAction,
    IIncDecAction,
    incDecContextValue,
    toggleContextValue
} from "../AppActions";
import {findValueSpec, IScenarioContextSpec} from "./Scenario";
import {Typography} from "@material-ui/core";
import {ContextValueChanger} from "./ParamChanger";
import {ScenarioContext} from "./Token";

export const CurrentScenarioContextManager = connect(
    (state: AppState) => ({spec: state.selectedScenario.contextSpec, context: state.gameContext}),
    (dispatch: Dispatch<IContextAction | IContextAction & IIncDecAction>) => ({
        incDecContextValue: (key: string, incDec: boolean) => dispatch(incDecContextValue(key, incDec)),
        toggleContextValue: (key: string) => dispatch(toggleContextValue(key))
    })
)(ContextManager);
function ContextManager({spec, context, incDecContextValue, toggleContextValue}:
                               {spec: IScenarioContextSpec, context: ScenarioContext,
                                incDecContextValue: (key: string, incDec: boolean) => void,
                                toggleContextValue: (key: string) => void}) {
    return <Typography variant="h5" style={{paddingTop: "2vmin"}}>
        {Object.keys(context).map(contextKey => (
            <ContextValueChanger key={contextKey} currentValue={context[contextKey]}
                                 valueSpec={(findValueSpec(spec, contextKey)!)}
                                 incDecContextValue={(incDec: boolean) => incDecContextValue(contextKey, incDec)}
                                 toggleContextValue={() => toggleContextValue(contextKey)}/>
        ))}
    </Typography>

}
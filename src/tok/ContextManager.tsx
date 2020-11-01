import {connect} from "react-redux";
import {AppState} from "../AppState";
import React, {Dispatch} from "react";
import {changeScenario, IScenarioAction} from "../AppActions";
import {Scenario} from "./Scenario";
import {Typography} from "@material-ui/core";
import {ContextValueChanger} from "./ParamChanger";

export const CurrentScenarioContextManager = connect(
    (state: AppState) => ({scenario: state.selectedScenario}),
    (dispatch: Dispatch<IScenarioAction>) => ({
        setScenario: (newScenario: Scenario) => dispatch(changeScenario(newScenario))
    })
)(ContextManager);
function ContextManager({scenario, setScenario}: {scenario: Scenario, setScenario: (newScenario: Scenario) => void}) {
    const context = scenario.currentContext;
    return <Typography variant="h5" style={{paddingTop: "2vmin"}}>
        {Object.keys(context).map(contextKey => (
            <ContextValueChanger key={contextKey} name={contextKey} currentValue={context[contextKey]}
                                 scenario={scenario} setScenario={setScenario}/>
        ))}
    </Typography>
}
import React from "react";
import {findValueSpec, Scenario} from "./Scenario";

export function ContextValueChanger(props: {name: string, currentValue: number | boolean, scenario: Scenario, setScenario: (scenario: Scenario) => void}) {
    const contextKey = props.name;
    const valueSpec = findValueSpec(props.scenario.getContextSpec(), contextKey)!;
    if (valueSpec.type === "number") {
        return (
            <NumericParamChanger name={valueSpec.description} currentValue={props.currentValue as number}
                                 incValue={() => props.setScenario(props.scenario.incContextValue(contextKey))}
                                 decValue={() => props.setScenario(props.scenario.decContextValue(contextKey))} />
        )
    } else {
        return (
            <BooleanParamChanger name={valueSpec.description} currentValue={props.currentValue as boolean}
                                 toggle={() => props.setScenario(props.scenario.toggleContextValue(contextKey))}/>
        )
    }
}
export function NumericParamChanger(props: {name: string, currentValue: number, incValue: () => void, decValue: () => void}) {
    const name = props.name;
    const currentValue = props.currentValue;
    const incDecStyle = {verticalAlign: "middle"};
    return (
        <div className="ParamChanger">
            <label>{name}</label>:
            <span className="IconAction material-icons" style={incDecStyle} onClick={_ => props.incValue()}>arrow_circle_up</span>
            {currentValue}
            <span className="IconAction material-icons" style={incDecStyle} onClick={_ => props.decValue()}>arrow_circle_down</span>
        </div>
    )
}

export function BooleanParamChanger(props: {name: string, currentValue: boolean, toggle: () => void}) {
    const name = props.name;
    const currentValue = props.currentValue;
    const iconAction = currentValue ? "toggle_on" : "toggle_off"
    const switchStyle = {fontSize: "48px", verticalAlign: "middle", color: currentValue ? "white" : "gray"};
    return (
        <div className="ParamChanger">
            <label>{name}</label>:
            <span className="IconAction material-icons" style={switchStyle} onClick={_ => props.toggle()}>{iconAction}</span>
        </div>
    )
}
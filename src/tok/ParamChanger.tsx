import React from "react";
import {IContextValueSpec} from "./Scenario";
import {IconButton, InputLabel, Switch} from "@material-ui/core";

export function ContextValueChanger(props: {
    currentValue: number | boolean, valueSpec: IContextValueSpec, incDecContextValue: (incDec: boolean) => void, toggleContextValue: () => void}) {
    const valueSpec = props.valueSpec;
    if (valueSpec.type === "number") {
        return (
            <NumericParamChanger inline={false} name={valueSpec.description} currentValue={props.currentValue as number}
                                 incValue={() => props.incDecContextValue(true)}
                                 decValue={() => props.incDecContextValue(false)} />
        )
    } else {
        return (
            <BooleanParamChanger name={valueSpec.description} currentValue={props.currentValue as boolean}
                                 toggle={() => props.toggleContextValue()}/>
        )
    }
}

export function NumericParamChanger(props: {inline: boolean, name: string, currentValue: number, incValue: () => void, decValue: () => void}) {
    const name = props.name;
    const currentValue = props.currentValue;
    const incDecStyle = {verticalAlign: "middle"};
    return (
        <div className="ParamChanger">
            {props.inline ? <span>{name}</span> : <InputLabel>{name}</InputLabel>}
            <IconButton className="IconAction material-icons" style={incDecStyle} onClick={_ => props.incValue()}>arrow_circle_up</IconButton>
            {currentValue}
            <IconButton className="IconAction material-icons" style={incDecStyle} onClick={_ => props.decValue()}>arrow_circle_down</IconButton>
        </div>
    )
}

export function BooleanParamChanger(props: {name: string, currentValue: boolean, toggle: () => void}) {
    const name = props.name;
    const currentValue = props.currentValue;
    return (
        <div className="ParamChanger">
            <InputLabel>{name}:</InputLabel>
            <Switch
                checked={currentValue}
                onChange={_ => props.toggle()}
                color="primary"
                name="name"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
    )
}
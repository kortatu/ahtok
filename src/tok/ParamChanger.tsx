import React from "react";
import {IContextValueSpec} from "./Scenario";
import {IconButton, InputLabel, Switch} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export function ContextValueChanger(props: {
    currentValue: number | boolean, valueSpec: IContextValueSpec, incDecContextValue: (incDec: boolean) => void, toggleContextValue: () => void}) {
    const valueSpec = props.valueSpec;
    const { t } = useTranslation();
    if (valueSpec.type === "number") {
        return (
            <NumericParamChanger inline={false} name={t(valueSpec.name)} currentValue={props.currentValue as number}
                                 incValue={() => props.incDecContextValue(true)}
                                 decValue={() => props.incDecContextValue(false)} />
        )
    } else {
        return (
            <BooleanParamChanger name={t(valueSpec.name)} currentValue={props.currentValue as boolean}
                                 toggle={() => props.toggleContextValue()}/>
        )
    }
}

type NumericParamChangerProps =
    { inline: boolean, name: string, currentValue: number, incValue: () => void, decValue: () => void };

export function NumericParamChanger({inline, name, currentValue, incValue, decValue}: NumericParamChangerProps) {
    const incDecStyle = {verticalAlign: "middle"};
    return (
        <div className="ParamChanger">
            {inline ? <span>{name}</span> : <InputLabel>{name}</InputLabel>}
            <IconButton className="IconAction material-icons" style={incDecStyle} onClick={_ => incValue()}>arrow_circle_up</IconButton>
            {currentValue}
            <IconButton className="IconAction material-icons" style={incDecStyle} onClick={_ => decValue()}>arrow_circle_down</IconButton>
        </div>
    )
}

type BooleanParamChangerProps = { name: string, currentValue: boolean, toggle: () => void };

export function BooleanParamChanger({name, currentValue, toggle}: BooleanParamChangerProps) {
    return (
        <div className="ParamChanger">
            <InputLabel>{name}:</InputLabel>
            <Switch
                checked={currentValue}
                onChange={_ => toggle()}
                color="primary"
                name="name"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
    )
}
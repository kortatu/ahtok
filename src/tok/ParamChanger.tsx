import React from "react";

export function ParamChanger(props: {name: string, currentValue: number, incValue: () => void, decValue: () => void}) {
    const name = props.name;
    const currentValue = props.currentValue;
    return (
        <div className="ParamChanger">
            <label>{name}</label>:
            <div className="IconAction material-icons" onClick={_ => props.incValue()}>arrow_circle_up</div>
            {currentValue}
            <span className="IconAction material-icons" onClick={_ => props.decValue()}>arrow_circle_down</span>
        </div>
    )
}
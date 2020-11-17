import {TokenSpec} from "./Token";
import React, {useState} from "react";
import {Fade} from "@material-ui/core";

export function TokenSpan(props: {token: TokenSpec, onClick?: (token: TokenSpec) => void, fadeOut?: boolean, fadeOutFadeIn?: boolean}){
    const [fadeIn, setFadeIn] = useState(true);
    const handler = () => {
        if (props.onClick) {
            if (props.fadeOut || props.fadeOutFadeIn) {
                setFadeIn(false);
            } else {
                props.onClick(props.token);
            }
        }
    };
    const fadeExitedHandler = () => {
        if (props.onClick) {
            props.onClick(props.token);
        }
        setFadeIn(true);
    }
    return (
        <Fade in={fadeIn} onExited={fadeExitedHandler}>
            <span style={{cursor: "pointer"}} className={"Token " + props.token.name} onClick={handler}>T</span>
        </Fade>
    )
}
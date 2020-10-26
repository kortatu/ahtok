import {TokenSpec} from "./Token";
import React from "react";

export function TokenSpan(props: {token: TokenSpec}){
    return <span className={"Token " + props.token.name}>T</span>
}
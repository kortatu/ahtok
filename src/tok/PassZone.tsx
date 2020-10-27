import React, {CSSProperties, useState} from "react";
import {passZoneLines, ISkillLine, nnDec, printSkillLine, TokenBagPassZone} from "./Token";
import "./Tok.css"
import {NumericParamChanger} from "./ParamChanger";
import {TokenSpan} from "./TokenSpan";

export function PassZone(props: {passZone: TokenBagPassZone}) {
    const [skill, setSkill] = useState<number>(4);
    const [test, setTest] = useState<number>(3);
    const ulStyle: CSSProperties = {
        textAlign: "left",
        listStyleType: "none",
    }
    return (
        <div className="PassZone">
            <h2>Pass zone</h2>
            <div className="tokenBagPassZone">
                <ul style={ulStyle}>
                    <hr />
                    {
                    passZoneLines(props.passZone, skill, test).map(line => (
                        <PassLine key={line.key} line={line} />
                    ))
                    }
                    <hr />
                </ul>
            </div>
            {SkillTestChanger(setSkill, skill, setTest, test)}
        </div>
    )
}

function SkillTestChanger(setSkill: (value: (((prevState: number) => number) | number)) => void, skill: number,
                          setTest: (value: (((prevState: number) => number) | number)) => void, test: number) {
    const incSkill = () => setSkill(skill + 1);
    const incTest = () => setTest(test + 1);
    const decSkill = () => setSkill(nnDec(skill));
    const decTest = () => setTest(nnDec(test));
    return (
        <div>
            <NumericParamChanger name="Skill" currentValue={skill} incValue={incSkill} decValue={decSkill}/>
            <NumericParamChanger name="Test" currentValue={test} incValue={incTest} decValue={decTest}/>
        </div>
    );
}

function PassLine(props: {line: ISkillLine}) {
    const line = props.line;
    const skill = line.key;
    const liStyle = {
        color: line.pass ? "green" : "red",
    }
    let lineSeparator;
    if (line.firstFail) {
        lineSeparator = <hr className="PassSeparator Current"/>;
    } else {
        lineSeparator = <hr className="PassSeparator" style={{borderColor: "transparent"}}/>;
    }
    const trailSpace = skill >= 0 ? <span>&nbsp;</span> : "";
    return (
        <li id={"passLine_" + skill} style={liStyle}>
            { lineSeparator}
            <div className="TokenPassLine" style={{display: "flex"}}>
                <div className="LineKey">
                    <strong>{trailSpace}{line.key}</strong>:
                </div>
                <div className="LineProb">
                    <span>{line.prob.toFixed(2)}%</span>
                </div>
                <div className="TokenStrip">
                    {line.tokens.map((token, index) => (
                        <TokenSpan key={index} token={token} />
                    ))}
                    {/*<span className="material-icons" style={{color: "yellow", fontSize: "medium"}}>*/}
                    {/*{line.currentProb ? "west" : ""}*/}
                    {/*</span>*/}
                </div>
            </div>
        </li>
    )
}
import React, {CSSProperties, useState} from "react";
import {bagSkillLines, ISkillLine, nnDec, printSkillLine, TokenBagPassZone} from "./Token";
import "./Tok.css"
import {ParamChanger} from "./ParamChanger";

export function PassZone(props: {bag: TokenBagPassZone}) {
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
                    bagSkillLines(props.bag, skill, test).map( line => (
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
            <ParamChanger name="Skill" currentValue={skill} incValue={incSkill} decValue={decSkill}/>
            <ParamChanger name="Test" currentValue={test} incValue={incTest} decValue={decTest}/>
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
        lineSeparator = <hr className="PassSeparator"/>;
    } else {
        lineSeparator = "";
    }
    const trailSpace = skill >= 0 ? <span>&nbsp;</span> : "";
    return (
        <li id={"passLine_" + skill} style={liStyle}>
            { lineSeparator}
            <div style={{display: "flex"}}>
                <div className="LineKey">
                    <strong>{trailSpace}{line.key}</strong>:
                </div>
                <div className="LineProb">
                    <span>{line.prob.toFixed(2)}%</span>
                    <span className="material-icons" style={{color: "yellow", fontSize: "medium"}}>
                    {line.currentProb ? "west" : ""}
                    </span>
                </div>
            </div>
        </li>
    )
}
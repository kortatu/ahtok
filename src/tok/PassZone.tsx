import React, {CSSProperties, useState} from "react";
import {passZoneLines, ISkillLine, nnDec, printSkillLine, TokenBagPassZone} from "./Token";
import "./Tok.css"
import {NumericParamChanger} from "./ParamChanger";
import {TokenSpan} from "./TokenSpan";
import {Container, Grid, GridSize, Typography} from "@material-ui/core";

export function PassZone(props: {passZone: TokenBagPassZone}) {
    const [skill, setSkill] = useState<number>(4);
    const [test, setTest] = useState<number>(3);
    const ulStyle: CSSProperties = {
        textAlign: "left",
        listStyleType: "none",
    }
    const lines = passZoneLines(props.passZone, skill, test);
    return (
        <Grid container className="PassZone" alignItems={"center"}>
            <Grid item xs={12} sm={8} md={6} >
            <Typography variant="h4">Pass zone</Typography>
            <hr />
            <Grid container direction="column">
                    {
                    lines.map(line => (
                        <Grid key={line.key} item>
                            <PassLineGrid line={line} />
                        </Grid>
                    ))
                    }
            </Grid>
            <hr />
            </Grid>
            <Grid item xs={12} sm={4} md={6} style={{textAlign: "center"}}>
                {SkillTestChanger(setSkill, skill, setTest, test)}
            </Grid>
        </Grid>
    )
}

function SkillTestChanger(setSkill: (value: (((prevState: number) => number) | number)) => void, skill: number,
                          setTest: (value: (((prevState: number) => number) | number)) => void, test: number) {
    const incSkill = () => setSkill(skill + 1);
    const incTest = () => setTest(test + 1);
    const decSkill = () => setSkill(nnDec(skill));
    const decTest = () => setTest(nnDec(test));
    return (
        <Typography variant="h5">
            <NumericParamChanger inline={true} name="Skill" currentValue={skill} incValue={incSkill} decValue={decSkill}/>
            <NumericParamChanger inline={true} name="Test" currentValue={test} incValue={incTest} decValue={decTest}/>
        </Typography>
    );
}

function PassLineGrid(props: {line: ISkillLine}) {
    const line = props.line;
    const rowStyle: CSSProperties = {
        borderTopWidth: line.firstFail ? "0.2em" : "0px",
        borderTopColor: line.firstFail ? "secondary": "transparent",
        borderTopStyle: line.firstFail ? "dashed": "none"
    }
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
    return (
        <div>{lineSeparator}
        <Grid container  direction="row"  alignItems="flex-start" xs={12} sm={12} spacing={1}>
            <Grid item style={{...liStyle, textAlign: "center"}} xs={2} sm={1}>
                <Typography variant="h5" >{line.key}</Typography>
            </Grid>
            <Grid item style={liStyle} className="LineProb" xs={2} sm={2}>
                <Typography variant="body1">{line.prob.toFixed(2)}%</Typography>
            </Grid>
            <Grid item style={{textAlign: "left"}} xs={8} sm={9}>
                <Typography variant="h3" noWrap={true}>
                {line.tokens.map((token, index) => (
                    <TokenSpan key={index} token={token} />
                ))}
                </Typography>
            </Grid>
        </Grid>
        </div>
    )
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
            <Typography variant="h5" className="TokenPassLine" style={{display: "flex"}}>
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
            </Typography>
        </li>
    )
}
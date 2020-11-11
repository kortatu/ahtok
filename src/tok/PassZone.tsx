import React from "react";
import {passZoneLines, ISkillLine, TokenBagPassZone, TokenBag, tokenBagPassZone} from "./Token";
import "./Tok.css"
import {TokenSpan} from "./TokenSpan";
import {Grid, Typography} from "@material-ui/core";
import {CurrentSkillTestChanger} from "./SkillTestChanger";
import {SkillTest} from "./SkillTest";
import {connect} from "react-redux";
import {AppState} from "../AppState";
import {useTranslation} from "react-i18next";

function mapStateToProps(state: AppState, ownProps: {tokenBag: TokenBag}) {
    return {
        passZone: tokenBagPassZone(ownProps.tokenBag),
        skillTest: state.skillTest
    }
}

export const CurrentPassZone = connect(mapStateToProps)(PassZone);

export function PassZone({passZone, skillTest}: {passZone: TokenBagPassZone, skillTest: SkillTest}) {
    const { t } = useTranslation();
    const lines = passZoneLines(passZone, skillTest.skill, skillTest.test);
    return (
        <Grid container className="PassZone" alignItems={"center"}>
            <Grid item xs={12} sm={7} md={6} >
            <Typography variant="h4">{t('Pass zone')}</Typography>
            <hr />
            <Grid container direction="column">
                {
                    lines.map(line => (
                        <Grid key={line.key} item>
                            <PassLine line={line} />
                        </Grid>
                    ))
                }
            </Grid>
            <hr />
            </Grid>
            <Grid item xs={12} sm={5} md={6} style={{textAlign: "center"}}>
                <CurrentSkillTestChanger />
            </Grid>
        </Grid>
    )
}

function PassLine(props: {line: ISkillLine}) {
    const line = props.line;
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
        <Grid container  direction="row"  alignItems="flex-start" spacing={1}>
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

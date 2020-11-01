import {Typography} from "@material-ui/core";
import {NumericParamChanger} from "./ParamChanger";
import React from "react";
import {connect} from "react-redux";
import {AppState} from "../AppState";
import {Dispatch} from "redux";
import {decreaseSkill, decreaseTest, increaseSkill, increaseTest} from "../AppActions";

const mapStateToProps = (state: AppState) => {
    return {
        skill: state.skillTest.skill,
        test: state.skillTest.test
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        incSkill: () => dispatch(increaseSkill()),
        decSkill: () => dispatch(decreaseSkill()),
        incTest: () => dispatch(increaseTest()),
        decTest: () => dispatch(decreaseTest())
    }
}

export const CurrentSkillTestChanger = connect(mapStateToProps, mapDispatchToProps)(SkillTestChanger);

function SkillTestChanger(props: {skill: number, test: number,
                                  incSkill: () => void, decSkill: () => void,
                                  incTest: () => void, decTest: () => void}) {
    const {skill, test, incSkill, decSkill, incTest, decTest} = props;
    return (
        <Typography variant="h5">
            <NumericParamChanger inline={true} name="Skill" currentValue={skill} incValue={incSkill} decValue={decSkill}/>
            <NumericParamChanger inline={true} name="Test" currentValue={test} incValue={incTest} decValue={decTest}/>
        </Typography>
    );
}
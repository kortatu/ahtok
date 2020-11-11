import React, {useState} from "react";
import {IScenarioSpec} from "./Scenario";
import {CurrentPassZone} from "./PassZone";
import {TokenBag} from "./Token";
import {Box, Button, Modal, Typography} from "@material-ui/core";
import {CurrentCharacterSelector} from "./CharacterSelector";
import {connect} from "react-redux";
import {AppState, buildBagFromState} from "../AppState";
import {CurrentScenarioContextManager} from "./ContextManager";
import {BagDisplay, CurrentTokenBagManager} from "./TokenBag";


const mapStateToProps = (state: AppState) => ({tokenBag: buildBagFromState(state), scenario: state.selectedScenario});

export const CurrentScenarioPassZone = connect(mapStateToProps)(ScenarioPassZone);

export function ScenarioPassZone({tokenBag, scenario}: {tokenBag: TokenBag, scenario: IScenarioSpec}) {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="Scenario">
            <div className="ScenarioInfo">
                <Typography variant="h3">{scenario.name}</Typography>
                <CurrentScenarioContextManager />
                <CurrentCharacterSelector />
            </div>
            <CurrentPassZone tokenBag={tokenBag}/>

            <BagDisplay tokenBag={tokenBag} onClick={() => setOpen(true)} fadeOutTokens={false}/>
            <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="bag-management-title">
                <CurrentTokenBagManager tokenBag={tokenBag}/>
            </Modal>
            <Box textAlign={"center"}>
                <Button color="secondary" onClick={() => setOpen(true)}>Gestionar bolsa del caos</Button>
            </Box>
        </div>
    );
}

import {allKnownTokens, allTokens, TokenBag, TokenBagSpec, tokenFloatAverage, TokenSpec} from "./Token";
import {Box, createStyles, Theme, Typography} from "@material-ui/core";
import {TokenSpan} from "./TokenSpan";
import {makeStyles} from "@material-ui/core/styles";
import {AppState} from "../AppState";
import {Dispatch} from "redux";
import {addToken, ITokenAction, removeToken} from "../AppActions";
import {connect} from "react-redux";
import React from "react";

export function BagDisplay({tokenBag, showAverage = true, onClick, fadeOutTokens = false}:
                               {tokenBag: TokenBag, showAverage?: boolean, onClick?: (token: TokenSpec) => void, fadeOutTokens: boolean}) {
    return <div className="BagDisplay">
        {showAverage ? (<Typography>Bag average: {tokenFloatAverage(tokenBag)}</Typography>) : null }
        <p className="TokenStrip">
            {allTokens(tokenBag).map((token, index) => (
                <TokenSpan key={token.id} token={token} onClick={onClick} fadeOut={fadeOutTokens}/>
            ))}
        </p>
    </div>
}

export const CurrentTokenBagManager = connect(
    (state: AppState, ownProps: { tokenBag: TokenBag }) => {
        return {
            tokenBag: ownProps.tokenBag
        }
    },
    (dispatch: Dispatch<ITokenAction>) => {
        return {
            addToken: (token: TokenSpec) => dispatch(addToken(token)),
            removeToken: (token: TokenSpec) => dispatch(removeToken(token)),
        }
    }
)(TokenBagManager);
function TokenBagManager({tokenBag, addToken, removeToken}: {tokenBag: TokenBag,
    addToken: (token: TokenSpec) => void, removeToken: (token: TokenSpec) => void}) {
    const classes = useModalStyles();
    const allKnown = allKnownTokens();
    return (
        <Box textAlign="center" className={classes.paper}>
            <Typography id="bag-management-title" variant="h3">Bolsa del caos</Typography>
            <Typography >Bolsa actual. Selecciona tokens para eliminarlos</Typography>
            <BagDisplay tokenBag={tokenBag} showAverage={false}
                        onClick={(token: TokenSpec) => removeToken(token)} fadeOutTokens={true}/>
            <Typography >Selecciona tokens para añadirlos a la bolsa</Typography>
            <BagSpecDisplay tokenBagSpec={allKnown} onClick={(token: TokenSpec) => addToken(token)}/>
        </Box>
    );
}

function BagSpecDisplay({tokenBagSpec, onClick}: {tokenBagSpec: TokenBagSpec, onClick?: (token: TokenSpec) => void}) {
    return <div className="BagDisplay">
        <p className="TokenStrip">
            {tokenBagSpec.tokens.map((token, index) => (
                <TokenSpan key={index} token={token} onClick={onClick} fadeOut={false} fadeOutFadeIn={true}/>
            ))}
        </p>
    </div>
}

const useModalStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'relative',
            left: "15%",
            top: "40%",
            width: "70%",
            opacity: 0.9,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #FFF',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);




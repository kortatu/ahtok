import {Scenario} from "./Scenario";
import {PassZone} from "./PassZone";
import React, {CSSProperties, useState} from "react";
import {allTokens, seal, Token, tokenAverage, TokenBagPassZone, tokenFloatAverage, TokenSpec} from "./Token";
import {AHCharacter} from "./AHCharacter";
import {ContextValueChanger, NumericParamChanger} from "./ParamChanger";
import {TokenSpan} from "./TokenSpan";
import {
    createStyles,
    FormControl,
    MenuItem,
    Select,
    Theme,
    makeStyles,
    InputLabel,
    Box,
    Typography, Container, List, ListItem
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

export function ScenarioPassZone(props: {scenario: Scenario, setScenario: (newS: Scenario) => void}) {
    const scenario = props.scenario;
    const [character, setCharacter] = useState<AHCharacter>(scenario.getCharacter());
    scenario.setCharacter(character);
    const setScenario = props.setScenario;
    const characters = scenario.characters;
    const context = scenario.currentContext;
    const bag: TokenBagPassZone = scenario.tokenBagPassZone();
    const classes = useStyles();


    const findCharacterByShortName = (shortName: string) => {
        return characters.find(c => c.shortName === shortName);
    }

    return (
        <div className="Scenario">
            <div className="ScenarioInfo">
                <Typography variant="h3">{scenario.name()}</Typography>
                <Typography variant="h5" style={{paddingTop: "2vmin"}}>
                        { Object.keys(context).map( contextKey => (
                            <ContextValueChanger key={contextKey} name={contextKey} currentValue={context[contextKey]}
                                             scenario={scenario} setScenario={setScenario} />
                        ))}
                </Typography>
                <div>
                    <InputLabel>Personaje actual:</InputLabel>
                    <FormControl variant="standard" className={classes.formControl}>
                        <Select
                            labelId="character-selector-label"
                            id="character-selector"
                            value={character.shortName}
                            onChange={e => setCharacter(findCharacterByShortName(e.target.value as string)!)}>
                            {characters.map( aChar => (
                                <MenuItem key={aChar.shortName} value={aChar.shortName}>{aChar.shortName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <PassZone passZone={bag} />
            <div className="BagDisplay">
                <Typography>Bag average: {tokenFloatAverage(bag.tokenBag)}</Typography>
                <p className="TokenStrip">{allTokens(bag.tokenBag).map((token, index) => (
                    <TokenSpan key={index} token={token} />
                ))}
                </p>
            </div>
        </div>
    );
}


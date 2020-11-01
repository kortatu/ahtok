import {createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme} from "@material-ui/core";
import {AppState} from "../AppState";
import {Dispatch} from "redux";
import {AHCharacter} from "./AHCharacter";
import {changeCharacter} from "../AppActions";
import {connect} from "react-redux";
import React from "react";

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

const mapStateToProps = (state: AppState) => ({character: state.selectedCharacter, characters: state.selectedCampaign.characters});
const mapDispatchToProps = (dispatch: Dispatch) => ({setCharacter: (character: AHCharacter) => dispatch(changeCharacter(character))});
export const CurrentCharacterSelector = connect(
    mapStateToProps,
    mapDispatchToProps)(CharacterSelector);

export function CharacterSelector(props: {character: AHCharacter, characters: AHCharacter[], setCharacter: (character: AHCharacter) => void}) {
    const {character, characters, setCharacter} = props;
    const findCharacterByShortName = (shortName: string): AHCharacter | undefined => {
        return characters.find(c => c.shortName === shortName);
    }

    return <div>
        <InputLabel>Personaje actual:</InputLabel>
        <FormControl variant="standard" className={useStyles().formControl}>
            <Select
                labelId="character-selector-label"
                id="character-selector"
                value={character.shortName}
                onChange={e => setCharacter(findCharacterByShortName(e.target.value as string)!)}>
                {characters.map(aChar => (
                    <MenuItem key={aChar.shortName} value={aChar.shortName}>{aChar.shortName}</MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>;
}
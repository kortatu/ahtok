import {AHLevel, AHLevels, Campaign, Campaigns} from "./tok/Campaign";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {useModalStyles} from "./CommonStyles";
import {
    Box,
    Button,
    Checkbox,
    createStyles,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Theme,
    Typography
} from "@material-ui/core";
import {connect} from "react-redux";
import {AppState} from "./AppState";
import {Dispatch} from "redux";
import {selectCampaign} from "./AppActions";
import {AHCharacter, AHCharacters} from "./tok/AHCharacter";

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
type WizardProps = { campaignWizard: CampaignWizard, setCampaignWizard: (campaignWizard: CampaignWizard) => void }
export const CampaignWizardChanger = connect((_: AppState) => ({}),
    (dispatch: Dispatch, ownProps: { close: () => void }) => ({
        setCampaign: (campaign: Campaign) => {
            ownProps.close();
            dispatch(selectCampaign(campaign));
        }
    }))(CampaignWizardComp)

function CampaignWizardComp({setCampaign}: { setCampaign: (campaign: Campaign) => void }) {
    const {t} = useTranslation();
    const [campaignWizard, setCampaignWizard] = useState({characters: []} as CampaignWizard)
    const classes = useModalStyles();

    function selectCampaignId(campaignId: string) {
        setCampaignWizard({campaignId, characters: []})
    }

    function setCampaignFromWizard(campaignWizard: CampaignWizard) {

        const campaignSpec = Campaigns[campaignWizard.campaignId!];
        const campaign = Campaign.start(campaignSpec, campaignWizard.characters, campaignWizard.level!);
        campaign.startCampaign(0);
        setCampaign(campaign);
    }

    return (
        <Box textAlign="center" className={classes.paper}>
            <Typography id="bag-management-title" variant="h3">{t('Create campaign')}</Typography>
            <InputLabel>{t('Select campaign')}</InputLabel>
            <FormControl variant="standard" className={useStyles().formControl}>
                <Select
                    labelId="campaign-selector-label"
                    id="campaign-selector"
                    value={campaignWizard.campaignId ?? ""}
                    onChange={e => selectCampaignId(e.target.value as string)}>
                    {Object.keys(Campaigns).map(campaignId => (
                        <MenuItem key={campaignId} value={campaignId}>{t(Campaigns[campaignId].name)}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {campaignWizard.campaignId ?
                <WizardStep2 campaignWizard={campaignWizard} setCampaignWizard={setCampaignWizard}/> : null}
            {campaignWizard.campaignId && campaignWizard.level && campaignWizard.characters.length > 0 ?
                <Button onClick={() => setCampaignFromWizard(campaignWizard)}>Create</Button> : null}
        </Box>
    )
}

function WizardStep2({campaignWizard, setCampaignWizard}: WizardProps) {
    const {t} = useTranslation();

    function selectLevel(level: AHLevel) {
        setCampaignWizard(Object.assign({}, campaignWizard, {level}))
    }

    return (
        <Box>
            <InputLabel>{t('Select level')}</InputLabel>
            <FormControl variant="standard" className={useStyles().formControl}>
                <Select
                    labelId="level-selector-label"
                    id="level-selector"
                    value={campaignWizard.level ?? ""}
                    onChange={e => selectLevel(e.target.value as AHLevel)}>
                    {AHLevels.map(level => (
                        <MenuItem key={level} value={level}>{t(level)}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {campaignWizard.level ?
                <WizardStep3 campaignWizard={campaignWizard} setCampaignWizard={setCampaignWizard}/> : null}
        </Box>
    )
}

function WizardStep3({campaignWizard, setCampaignWizard}: { campaignWizard: CampaignWizard, setCampaignWizard: (campaignWizard: CampaignWizard) => void }) {
    const {t} = useTranslation();

    function contains(characterId: string) {
        return campaignWizard.characters.some(ch => ch.id === characterId);
    }

    function addCharacter(ev: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        const character = AHCharacters[ev.target.name as string];
        let characters;
        if (checked) {
            characters = campaignWizard.characters.concat(character);
        } else {
            characters = campaignWizard.characters.filter(ch => ch.id !== character.id);
        }
        setCampaignWizard(Object.assign({}, campaignWizard, {characters}));
    }

    const error = campaignWizard.characters.length > 4;
    return (
        <Box>
            <FormControl error={error} component="fieldset" className={useStyles().formControl}>
                <FormLabel component="legend">{t('Pick up two four characters')}</FormLabel>
                <FormGroup>
                    {Object.keys(AHCharacters).map(characterId => (
                        <FormControlLabel
                            key={characterId}
                            control={<Checkbox checked={contains(characterId)} onChange={addCharacter}
                                               name={characterId}/>}
                            label={AHCharacters[characterId].name}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </Box>
    )
}

interface CampaignWizard {
    campaignId?: string;
    level?: AHLevel;
    characters: AHCharacter[];
}
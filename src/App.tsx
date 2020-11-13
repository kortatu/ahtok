import React from 'react';
import './App.css';
import {CurrentScenarioPassZone} from "./tok/ScenarioPassZone";
import {Box, Button, Container, CssBaseline, Typography} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import {tokTheme} from "./TokTheme";
import {connect} from "react-redux";
import {changeScenario as changeScenarioAction} from "./AppActions";
import {IScenarioSpec} from "./tok/Scenario";
import {nonAscii} from "./Utils";
import {useTranslation} from "react-i18next";
import I18n from "./I18n";
import {AppState} from "./AppState";
import {Campaign} from "./tok/Campaign";
import {loadCurrentLang, saveLang} from "./AppStore";
const Flags = require('country-flag-icons/react/3x2');

const App = connect(
    (store: AppState) => ({
        campaign: store.selectedCampaign
}),
    (dispatch => ({
        changeScenario: (scenario:IScenarioSpec) => dispatch(changeScenarioAction(scenario)),
    }))
)(AppComponent);

function AppComponent(props: {campaign: Campaign,
                        changeScenario: (scenario: IScenarioSpec) => void}) {
    const myLang = loadCurrentLang();
    I18n(myLang);
    const { t } = useTranslation();
    const themeSpec = tokTheme();
    const campaign = props.campaign;
    const campaignName = t(campaign.name);
    return (
    <ThemeProvider theme={themeSpec.theme}>

        <CssBaseline>
            <div className="App">
                <Typography style={{fontFamily: nonAscii(campaignName) ? themeSpec.headerFontFamilyNonAscii : themeSpec.headerFontFamily, textAlign: "center"}}
                            variant="h2" color="secondary" variantMapping={{h1: "header"}} className="App-header">
                    <Box style={{float: "right"}}>
                        <Flags.GB className={"IconAction"} onClick={() => saveLang('en')} style={{width: "0.5em", opacity: myLang === "en" ? "1.0" : "0.4"}}/>
                        <Flags.ES className={"IconAction"} onClick={() => saveLang('es')} style={{width: "0.5em", opacity: myLang === "es" ? "1.0" : "0.4"}}/>
                    </Box>
                    {campaignName}
                </Typography>
                <Container className="MainContainer" maxWidth="lg">
                    <Box textAlign={"center"}>
                        <Button color="secondary" onClick={() => props.changeScenario(campaign.prevScenario())}>{t('prev')}</Button>
                        <Button color="secondary" onClick={() => props.changeScenario(campaign.nextScenario())}>{t('next')}</Button>
                    </Box>
                    <CurrentScenarioPassZone />
                </Container>
            </div>
        </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import './App.css';
import {CurrentScenarioPassZone} from "./tok/ScenarioPassZone";
import {Box, Button, Container, CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import {tokTheme} from "./TokTheme";
import {connect} from "react-redux";
import {changeScenario as changeScenarioAction} from "./AppActions";
import {IScenarioSpec} from "./tok/Scenario";
import {useTranslation} from "react-i18next";
import {AppState} from "./AppState";
import {Campaign} from "./tok/Campaign";
import {TokHeader} from "./TokHeader";

const App = connect(
    (store: AppState) => ({
        campaign: store.selectedCampaign
}),
    (dispatch => ({
        changeScenario: (scenario:IScenarioSpec) => dispatch(changeScenarioAction(scenario)),
    }))
)(AppComponent);

function AppComponent({campaign, changeScenario}: {campaign: Campaign,
                        changeScenario: (scenario: IScenarioSpec) => void}) {
    const { t } = useTranslation();
    return (
    <ThemeProvider theme={tokTheme().theme}>
        <CssBaseline>
            <div className="App">
                <TokHeader campaign={campaign} />
                <Container className="MainContainer" maxWidth="lg">
                    <Box textAlign={"center"}>
                        <Button color="secondary"
                                onClick={() => changeScenario(campaign.prevScenario())}>{t('prev')}</Button>
                        <Button color="secondary"
                                onClick={() => changeScenario(campaign.nextScenario())}>{t('next')}</Button>
                    </Box>
                    <CurrentScenarioPassZone/>
                </Container>
            </div>
        </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

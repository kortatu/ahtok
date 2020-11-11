import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {CurrentScenarioPassZone} from "./tok/ScenarioPassZone";
import {Box, Button, Container, CssBaseline, Typography} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import {tokTheme} from "./TokTheme";
import {store} from "./AppStore";
import {Provider} from "react-redux";
import {changeScenario as changeScenarioAction} from "./AppActions";
import {IScenarioSpec} from "./tok/Scenario";
import {nonAscii} from "./Utils";


function App() {
    const campaign = store.getState().selectedCampaign;

    function changeScenario(scenario: IScenarioSpec) {
        store.dispatch(changeScenarioAction(scenario));
    }

    const themeSpec = tokTheme();
    return (
    <ThemeProvider theme={themeSpec.theme}>
        <CssBaseline>
            <Provider store={store}>
                <div className="App">
                    <Typography style={{fontFamily: nonAscii(campaign.name) ? themeSpec.headerFontFamilyNonAscii : themeSpec.headerFontFamily, textAlign: "center"}}
                                variant="h2" color="secondary" variantMapping={{h1: "header"}} className="App-header">
                        {campaign.name}
                    </Typography>
                    <Container className="MainContainer" maxWidth="lg">
                        <Box textAlign={"center"}>
                            <Button color="secondary" onClick={() => changeScenario(campaign.prevScenario())}>Prev</Button>
                            <Button color="secondary" onClick={() => changeScenario(campaign.nextScenario())}>Next</Button>
                        </Box>
                        <CurrentScenarioPassZone />
                    </Container>
                </div>
            </Provider>
        </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

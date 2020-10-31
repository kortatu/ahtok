import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import {startAlvaroElCirculoRotoLPDP} from "./tok/ElCirculoRoto";
import {Campaign} from "./tok/Campaign";
import {ScenarioPassZone} from "./tok/ScenarioPassZone";
import {Scenario} from "./tok/Scenario";
import {Box, Button, Container, CssBaseline, Typography} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import {tokTheme} from "./TokTheme";


const firstCampaign = startAlvaroElCirculoRotoLPDP();
const firstScenario = firstCampaign.getScenario();

function App() {
    const [campaign, setCampaign] = useState<Campaign>(firstCampaign);
    const [scenario, setScenario] = useState<Scenario>(firstScenario);

    const themeSpec = tokTheme();
    return (
    <ThemeProvider theme={themeSpec.theme}>
        <CssBaseline>
            <div className="App">
                <Typography style={{fontFamily: themeSpec.headerFontFamily, textAlign: "center"}}
                            variant="h2" color="secondary" variantMapping={{h1: "header"}} className="App-header">
                    The Circle Undone
                </Typography>
                <Container className="MainContainer" maxWidth="lg">
                    <Box textAlign={"center"}>
                        <Button color="secondary" onClick={() => setScenario(campaign.prevScenario())}>Prev</Button>
                        <Button color="secondary" onClick={() => setScenario(campaign.nextScenario())}>Next</Button>
                    </Box>
                    <ScenarioPassZone scenario={scenario} setScenario={setScenario}/>
                </Container>
            </div>
        </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

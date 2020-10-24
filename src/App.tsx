import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import {startAlvaroElCirculoRotoLPDP} from "./tok/ElCirculoRoto";
import {Campaign} from "./tok/Campaign";
import {ScenarioPassZone} from "./tok/ScenarioPassZone";
import {Scenario} from "./tok/Scenario";

const firstCampaign = startAlvaroElCirculoRotoLPDP();
const firstScenario = firstCampaign.getScenario();
function App() {
  const [campaign, setCampaign] = useState<Campaign>(firstCampaign);
  const [scenario, setScenario] = useState<Scenario>(firstScenario);
  return (
    <div className="App">
        <header className="App-header">{campaign.name}
        </header>
        <button onClick={(_) => setScenario(campaign.prevScenario())}>Prev</button>
        <button onClick={(_) => setScenario(campaign.nextScenario())}>Next</button>
        <ScenarioPassZone scenario={scenario} setScenario={setScenario}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

    </div>
  );
}

export default App;

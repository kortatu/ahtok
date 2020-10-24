import 'jest';
import {startAlvaroElCirculoRotoLPDP} from "./ElCirculoRoto";
import {histogram, printSkillLine} from "./Token";

describe('Config tests', () => {
    it('La paga del pecado', () => {
        const skill = 4;
        const test = 2;
        const campaign = startAlvaroElCirculoRotoLPDP();
        const bagCalc = campaign.getScenario().tokenBagPassZone();
        console.log("La Paga del Pecado 0\n" + printSkillLine(bagCalc, skill, test));
    });

    it('Por el bien común', () => {
        const skill = 5;
        const test = 2;
        const campaign = startAlvaroElCirculoRotoLPDP();
        campaign.nextScenario();
        const bagCalc = campaign.getScenario().tokenBagPassZone();
        console.log("Por el bien común 0\n" + printSkillLine(bagCalc, skill, test));
    });
});

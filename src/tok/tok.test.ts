import 'jest';
import {startAlvaroElCirculoRotoLPDP} from "./ElCirculoRoto";
import {histogram, printSkillLine} from "./Token";

describe('Config tests', () => {
    it('La paga del pecado', () => {
        const skill = 4;
        const test = 2;
        const campaign = startAlvaroElCirculoRotoLPDP();
    });

    it('Por el bien común', () => {
        const skill = 5;
        const test = 2;
        const campaign = startAlvaroElCirculoRotoLPDP();
        campaign.nextScenario();
    });
});

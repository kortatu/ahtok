import {Box, Modal, Typography} from "@material-ui/core";
import {nonAscii} from "./Utils";
import React, {useState} from "react";
import {Campaign} from "./tok/Campaign";
import {useTranslation} from "react-i18next";
import {tokTheme} from "./TokTheme";
import {loadCurrentLang, saveLang} from "./AppStore";
import {CampaignWizardChanger} from "./CampaignWizard";

const Flags = require('country-flag-icons/react/3x2');

export function TokHeader({campaign}: {campaign: Campaign}) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { t, i18n } = useTranslation();
    const myLang = loadCurrentLang();
    const themeSpec = tokTheme();
    const campaignName = t(campaign.name);
    const nonAsciiCharsInName = nonAscii(campaignName);

    function changeLang(lang: string) {
        i18n.changeLanguage(lang);
        saveLang(lang);
    }

    return(
        <Box className="App-header">
            <Box style={{float: "right"}}>
                <Flags.GB className={"IconAction"} onClick={() => changeLang("en")}
                          style={{width: "2em", opacity: myLang === "en" ? "1.0" : "0.4"}}/>
                <Flags.ES className={"IconAction"} onClick={() => changeLang("es")}
                          style={{width: "2em", opacity: myLang === "es" ? "1.0" : "0.4"}}/>
            </Box>
            <Typography onClick={() => setModalOpen(true)} style={{
                fontFamily: nonAsciiCharsInName ? themeSpec.headerFontFamilyNonAscii : themeSpec.headerFontFamily,
                textAlign: "center"}} variant="h2" color="secondary" variantMapping={{h1: "header"}} className="App-header">
                {campaignName}
            </Typography>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} aria-labelledby="bag-management-title">
                <CampaignWizardChanger close={() => setModalOpen(false)}/>
            </Modal>
        </Box>
    )
}


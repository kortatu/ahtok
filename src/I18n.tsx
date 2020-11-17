import i18 from "i18next";
import {initReactI18next} from "react-i18next";
import {campaignTranslations} from "./tok/Campaign";

export default function (lang = "es") {
    i18.use(initReactI18next)
        .init({
            resources: {
                es: {
                    translation: {
                        ...campaignTranslations["es"],
                        "prev": "prev.",
                        "next": "sig.",
                        "Pass zone": "Zona de éxito",
                        "Skill": "Habilidad",
                        "Test": "Dificultad",
                        "Bag average": "Valor medio",
                        "Current character": "Personaje actual",
                        "Manage chaos bag": "Gestionar bolsa del caos",
                        "Chaos bag": "Bolsa del caos",
                        "Current bag": "Bolsa actual",
                        "Select tokens to remove them": "Selecciona tokens para eliminarlos",
                        "Select tokens to add them to the bag": "Selecciona tokens para añadirlos a la bolsa",
                        "Select campaign": "Selecciona campaña",
                        "Create campaign": "Crear campaña",
                        "Select level": "Selecciona nivel",
                        "easy": "fácil", "normal": "normal", "hard": "difícil", "expert": "experto",
                        "Pick up two four characters": "Elige hasta 4 personajes",
                        "Create": "Crear"
                    }
                },
            },
            lng: lang,
            fallbackLng: "en"
        })
}
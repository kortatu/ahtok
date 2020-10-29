import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";

export function tokTheme() {
    const baseFontFamily = [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ];
    const theme = responsiveFontSizes(createMuiTheme({
        typography: {
            fontFamily: ['UglyQua'].concat(baseFontFamily).join(','),
            fontSize: 14
        },
        palette: {
            tonalOffset: 1,
            type: "dark",
            primary: {
                main: "#205b57",
            },
            secondary: {
                main: "#f4ebcc",
            }
        }
    }));
    const headerFontFamily = ["Birmingham"].concat(baseFontFamily).join(',');
    return {
        theme,
        headerFontFamily
    };
}
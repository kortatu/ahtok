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
    const birminghamFontFamily = "Birmingham";
    const uglyQuaFontFamily = 'UglyQua';
    const theme = responsiveFontSizes(createMuiTheme({
        typography: {
            fontFamily: [uglyQuaFontFamily].concat(baseFontFamily).join(','),
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

    const headerFontFamily = [birminghamFontFamily].concat(baseFontFamily).join(',');
    const headerFontFamilyNonAscii = [uglyQuaFontFamily].concat(baseFontFamily).join(',');
    return {
        theme,
        headerFontFamily,
        headerFontFamilyNonAscii
    };
}
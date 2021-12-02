import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
    palette: {
        primary: {
            main: '#0ca0aa'
        },
        secondary: {
            main: '#244b77'
        },
        error: {
            main: '#e95959',
        }
    },
    typography: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        button: {
            textTransform: "none",
        }
    }
})
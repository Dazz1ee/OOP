import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#00a9fe',
        },
        secondary: {
            main: '#FE9C3B',
        },
        background: {
            default : "#f5f5f5",
            paper: "#fff",
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            custom: 470,
            sm: 900,
            md: 1100,
            lg: 1600,
            xl: 1736,
        },
    },
});
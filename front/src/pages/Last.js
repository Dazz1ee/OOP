import {theme} from "../styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import {styled, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {useEffect} from "react";
import InfoService from "../services/requests";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";


const Item = styled(Paper)(() => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    justifyContent: 'center',
    margin : '5vh 0 0 0',
    display: 'flex',
    width: '60vw',
    color: theme.palette.text.secondary,
}));


export default function Last(){
    const [texts, setTexts] = React.useState([]);
    useEffect(() => {
        InfoService.getLastTexts()
            .then(response => setTexts(response.data))
            .catch(err => console.log(err))
    }, [])
    return(
        <ThemeProvider theme={theme} style={{width:'100vw'}}>
            <CssBaseline/>
            <Box sx={{flexGrow: 1, justifyContent: 'center'}}>
                <ResponsiveAppBar/>
                <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Item style={{display: 'flex', flexDirection: 'column'}}>
                        {texts.map((text) =>
                            <Typography component={"div"} key={text.id} style={{
                                fontSize: '1.1vw',
                                overflowWrap: 'break-word',
                                padding:'0.5vw 1vw 1vw 2vw',
                                textAlign: 'left'}}>
                                {"⚡" + `${text}`}
                            </Typography>
                        )}
                    </Item>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
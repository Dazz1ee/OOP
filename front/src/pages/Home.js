import * as React from 'react';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Box from "@mui/material/Box";
import TextForm from "../components/TextForm";
import {styled, ThemeProvider} from "@mui/material/styles";
import {theme} from "../styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import CustomButton from "../components/CustomButton";
import Typography from "@mui/material/Typography";
import CustomizedInputBase from "../components/CustomInput";
import {useEffect} from "react";
import '../styles/TStyle.css'
import CloseIcon from '@mui/icons-material/Close';
import InfoService from "../services/requests";
import IconButton from "@mui/material/IconButton";
import {Alert, CircularProgress, Collapse} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import AuthService from "../services/auth";
import {useNavigate} from "react-router";

const Item = styled(Paper)(() => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    margin : '5vh 0 1vh 0',
    width: '60vw',
    color: theme.palette.text.secondary,
}));

export default function Home() {
    const [alignment, setAlignment] = React.useState('left');
    const [countText, setCountText] = React.useState(1);

    const handleCountText = (event) => {
        setCountText(event.target.value)
    };
    const handleAlignment = (event, newAlignment) => {
        console.log(newAlignment)
        setAlignment(newAlignment);
    };

    const [value, setValue] = React.useState()
    const handleChange = (e) => {
        console.log(e.target.value)
        setValue(e.target.value)
    }

    const [response, setResponse] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [load, setLoad] = React.useState(false)

    const currentUser = AuthService.getCurrentUser();
    const navigate = useNavigate();

    const generateText = (e) => {
        if(!currentUser){
            navigate("/signin")
            window.location.reload()
            return
        }
        if(alignment && value) {
            setLoad(true)
            InfoService.generate(alignment === 'left' ? 'maipassage': 'panorama', value, countText)
                .then(res => {
                    setLoad(false)
                    setResponse(res.data)
                })
                .catch(error => {
                    setLoad(false)
                    if(error === 401){
                        navigate("/signin")
                    }
                    console.log(error)
                    }
                )
        } else {
            setOpen(true)
        }
    }
    useEffect(()=>{},[response])
    return (
            <ThemeProvider theme={theme} style={{width:'100vw'}}>
                <CssBaseline/>
                <Box sx={{flexGrow: 1}}>
                    <ResponsiveAppBar/>
                    <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Item style={{padding: '2vh'}}>
                            <TextForm handleCountText={handleCountText} />
                        </Item>
                        <Item style={{ padding: '0 5vh 5vh 5vh',
                            display: 'inline-block',
                            height: 'auto',
                        }}>
                            <div style={{display:'flex', justifyContent: 'center'}}>
                            <Typography className="typing"
                                        style={{width: "15em", margin: "3% 0 3% 0", fontWeight: 600, fontSize: '1.8vw', color: theme.palette.primary.dark}}>
                                Стиль:
                            </Typography>
                            </div>
                            <CustomButton style={{padding: '11vh'}} handleAlignment={handleAlignment} alignment={alignment}/>
                        </Item>
                        <Item style={{alignItems: 'center', flexDirection: 'column', justifyContent: 'start', display:'block', flex: 2}}>
                            <form onSubmit={generateText} style={{width:'100%', padding: '0 0 2vw 2vw'}}>
                                <CustomizedInputBase component="form" value={value} handleChange={handleChange} onSubmit={generateText}/>
                            </form>
                            <Collapse in={open}  style={{width:'fit-content'}}>
                                <Alert

                                    variant="outlined"
                                    severity="error"
                                    icon={<ErrorIcon style={{fontSize:'1.5vw'}}/>}
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            sx={{
                                                ':hover': {backgroundColor: '#fff'}

                                            }}
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon style={{fontSize:'1.5vw'}}/>
                                        </IconButton>
                                    }
                                    sx={{ mb: 2, fontSize:'1.2vw',
                                        [theme.breakpoints.down("sm")]: {
                                            padding: '0 5px 0 5px', '& .MuiAlert-action' : {padding: 0},
                                        },
                                        borderRadius: '16px'
                                        }}
                                >
                                    Выберите стиль и напишите начало текста
                                </Alert>
                            </Collapse>
                            <Typography gutterBottom style={{color: theme.palette.primary.dark, fontSize: '1.8vw'}}>Сгенерированный текст: </Typography>
                            {response.map((text, id) =>
                                    <Typography component={"div"} key={id} style={{
                                        fontSize: '1.1vw',
                                        overflowWrap: 'break-word',
                                        padding:'0.5vw 1vw 1vw 2vw',
                                        textAlign: 'left'}}>
                                        {`${text}`}
                                    </Typography>
                                )}
                            <Collapse in={load} style={{alignItems: "center", display: 'flex', justifyContent:'center'}}>
                                <Box style={{alignItems: "center", display: 'flex', justifyContent:'center'}}>
                                    <CircularProgress style={{width: '6vw', height:'6vw', margin: '2vw'}}/>
                                </Box>
                            </Collapse>
                        </Item>
                    </Box>
                </Box>
            </ThemeProvider>

        )
}
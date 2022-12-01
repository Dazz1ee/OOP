import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {ThemeProvider } from '@mui/material/styles';
import imageAuth from '../background.png'
import {theme} from '../styles/theme'
import {useState} from "react";
import {useNavigate} from "react-router";
import AuthService from "../services/auth";
import {Alert, Collapse} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        AuthService.reg(email, username, password).then(
            () => {
                navigate("/");
                window.location.reload()
            },
            (error) => {
                setOpen(true)
                console.log(error.message)
            }
        )
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${imageAuth})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "22vw"}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={e => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                type="username"
                                id="username"
                                onChange={e => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: "white"}}
                            >
                                Sign Up
                            </Button>
                            <Grid container style={{display: "flex", justifyContent: "space-between"}}>
                                <Grid item>
                                    <Link href="/" variant="body2" style={{textDecoration:'none'}}>
                                        {"На главную"}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signin" variant="body2" style={{textDecoration:'none'}}>
                                        {"Войти"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
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
                                Error
                            </Alert>
                        </Collapse>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
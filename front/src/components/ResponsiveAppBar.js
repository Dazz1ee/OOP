import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "../mai-web.svg"
import "../styles/AppBar.css";
import {useNavigate} from "react-router";
import AuthService from "../services/auth";
import {useEffect} from "react";


function ResponsiveAppBar() {
    const [settings, setSettings] = React.useState([]);
    const currentUser = AuthService.getCurrentUser();
    const [auth, setAuth] = React.useState(currentUser ? true : false);
    useEffect(() => {
        currentUser ?  setSettings(["Последний запрос", "Выход"]) : setSettings(["Войти"])
    }, [auth])

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLogo = () => {
        // window.location= "https://mai.ru/"
        navigate("/")
        window.location.reload()
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleMenu = (value) => {
        console.log(value)
        if(value === "Войти"){
            navigate('/signin')
            window.location.reload()
            console.log("Войти")
        } else if(value  === "Выход"){
            AuthService.logout();
            setAuth(false);
            // // window.location.reload()
            navigate("/")
        } else if(currentUser && value === "Последний запрос"){
            navigate("/last")
            window.location.reload()
        }
    }
    return (
        <AppBar position="static" style={{backgroundColor:"rgb(0 148 217)", display: "flex", justifyContent:"space-between", boxShadow: "none"}}>
            <Container maxWidth="100%" style={{padding: "0 10vw", justifyContent: "space-between"}}>
                <Toolbar disableGutters style={{display: "flex", justifyContent:"space-between"}}>
                    <img src={logo} alt="logo" className="Mai-icon" onClick={handleLogo}/>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Меню">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleIcon sx={{fill:"#fff", fontSize: "1.5em"}}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={e => handleMenu(setting)} >
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;

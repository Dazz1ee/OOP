import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import {theme} from "../styles/theme";
import TextFieldsIcon from '@mui/icons-material/TextFields';


export default function CustomizedInputBase(props) {
    return (
        <Box
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',
                backgroundColor: '#fff',
                borderColor: theme.palette.background.default,
                margin: '2vh 0 0 0',
                borderRadius: 25,
                borderWidth: '1px',
                borderStyle:'solid',
                width: "45%",
                ':hover': {
                    boxShadow: '4px 2px 13px 0px #0076b11f',
                    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                },
            }}
        >
            <InputBase
                placeholder="Введите текст"
                sx={{
                    ml: 1, flex: 1, fontSize: '1vw',
                }}
                value={props.value}
                onChange={props.handleChange}
            />
            <IconButton type="button" sx={{padding: '0.5vw', ":hover" : { left: 0}}} aria-label="search" onClick={props.onSubmit}>
                <TextFieldsIcon sx={{color: theme.palette.primary.dark, width: '1.5vw', height:'1.5vw'}}></TextFieldsIcon>
            </IconButton>
        </Box>
    );
}
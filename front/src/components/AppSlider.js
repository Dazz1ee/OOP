import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {theme} from "../styles/theme";

const marks = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
];

export default function AppSlider(props) {
    return (
        <Box width={"50%"}>
            <Slider
                style={{color: theme.palette.primary.main}}
                min={1}
                defaultValue={props.value}
                max={5}
                onChange={props.handleChange}
                marks={marks}
            />
        </Box>
    );
}
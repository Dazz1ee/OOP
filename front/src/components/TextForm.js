import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {theme} from '../styles/theme'
import AppSlider from "./AppSlider";
import Typography from "@mui/material/Typography";

export default function TextForm(props) {

    return (

            <Box container spacing={2}>
                <Grid xs={8}>
                    <div style={{display: "flex", flexDirection:"row", flexWrap: 'wrap', width: "relative", alignContent:"center", textAlign: "center"}}>
                        <Typography
                            style={{paddingRight: '1em', marginLeft: 0,
                                marginTop: "5px", marginRight: "1rem", fontWeight: 600,
                                fontSize: "1.1rem", color: theme.palette.primary.dark,

                                // [theme.breakpoints.down("sm")]: {
                                //     fontsize: 1,
                                // },

                        }}>
                            Количество вариантов:
                        </Typography>
                        <AppSlider value={props.value} handleChange={props.handleCountText}/>
                    </div>
                </Grid>
            </Box>

    );
}
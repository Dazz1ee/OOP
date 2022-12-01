import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import ButtonBases from "./ChoiseIcon";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {theme} from "../styles/theme";

const CustomToogle = styled(ToggleButtonGroup)(() => ({

    '& .Mui-selected' : {
        backgroundColor : "#fff",
        color : "#fff",
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.7,
            color: "#fff",
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
            color: "#fff",
            backgroundColor : "#fff",

        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
            [theme.breakpoints.down("md")]: {
                border: '1px solid currentColor',
            },
            [theme.breakpoints.down("sm")]: {
                border: '1px solid currentColor',
            },
            color: "#fff",
        },
    },

}));


export default function CustomButton(props){
    return(
        <CustomToogle
            style={{ padding: 0,
                display: 'flex', flexWrap: 'wrap',
                justifyContent: 'space-around',
            //     [theme.breakpoints.down("custom")]: {
            //         d
            // },
        }}
            value={props.alignment} exclusive onChange={props.handleAlignment}>
            <ToggleButton style={{maxWidth:"25vw", minWidth: '20vw', maxHeight:'40vh', padding: 0}}  value="left" selected={props.alignment === "left"}>
                <ButtonBases className="MuiBases-root" index={0}/>
            </ToggleButton>
            <ToggleButton style={{maxWidth:"25vw", minWidth:'20vw' , maxHeight:'40vh', padding: 0}}  value="right" selected={props.alignment === "right"}>
                <ButtonBases className="MuiBases-root" index={1}/>
            </ToggleButton>
        </CustomToogle>
    )
}
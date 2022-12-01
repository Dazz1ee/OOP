import * as React from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Maipassage from '../maipassage1.png'
import {theme} from "../styles/theme";
import panorama from "../panorama1.png"

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    paddingTop: '56.25%',
    position: 'relative',
    height: 20,
    [theme.breakpoints.down('sm')]: {
        width: '80 !important',
        height: 40,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.5,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
            [theme.breakpoints.down("md")]: {
                border: '1px solid currentColor',
            },
            [theme.breakpoints.down("sm")]: {
                border: '0.5px solid currentColor',
            },

        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(() => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(() => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.6,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(() => ({

    height: 3,
    width: 18,
    [theme.breakpoints.down("md")]: {
        height : 1,
        width: 13,
        bottom: -1,
        left: 'calc(50% - 6px)',
    },
    [theme.breakpoints.down("sm")]: {
        height : 1,
        width: 6,
        bottom: -1,
        left: 'calc(50% - 2px)',
    },
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -3,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

export default function ButtonBases(props) {
    const image = [
        {
            url: Maipassage,
            title: 'Маевский цитатник',
        },
        {
            url: panorama,
            title: 'Панорама МАИ',
        },
        ]

    return (
        <ImageButton
            focusRipple
            style={{
                width: "30vw",
            }}
        >
            <ImageSrc style={{ backgroundImage: `url(${image[props.index].url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image style={{justifyContent: 'center', textAlign: 'center'}}>
                <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                        position: 'relative',
                        // fontSize: '60%',
                        p: 4,
                        pt: '1vw',
                        // pb: (theme) => `calc(${theme.spacing(1)} + 2px)`,
                        [theme.breakpoints.down("sm")]: {
                            fontSize: '60%',

                            p: "4%",
                            pt: '0.5vw',
                        },
                        [theme.breakpoints.down("custom")]: {
                            fontSize: '30%',

                            p: "1%",
                            pt: '0.1vw',
                        },
                        [theme.breakpoints.down("md")]: {
                            fontSize: '60%',

                            p: "3%",
                            pt: '0.5vw',
                        },
                    }}
                >
                    {image[props.index].title}
                    <ImageMarked className="MuiImageMarked-root" />
                </Typography>
            </Image>
        </ImageButton>
    );
}
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Divider, IconButton, Link, Paper, Typography, Zoom } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import mealIcon from '../../mealIcon.svg'
import miniEvent from '../../miniEvent.svg';
import workshopIcon from '../../workshopIcon.svg';
import speakerIcon from '../../speakerIcon.svg';
import defaultIcon from '../../defaultIcon.svg';
import { Favorite, FavoriteBorder } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '2rem',
        padding: '2rem'
    },
    eventHeader: {
        display: 'flex',
    },
    iconSize: {
        height: theme.spacing(5),
        width: theme.spacing(5),
        marginLeft: theme.spacing(1),
    },
    footer: {
        display: 'flex',
        flexDirection: 'column'
    },
    favoriteIcon: {
        marginRight: 0,
        marginLeft: 'auto',
        color: '#F59EA5',
        fontSize: '40px'
    }
}));

const Event = (props) => {
    const classes = useStyles();
    const [icon, setIcon] = useState();
    const [favorite, setFavorite] = useState(<FavoriteBorder className={classes.favoriteIcon} />)


    const changeFavoriteStatus = (element) => {
        if (element.type.displayName === "FavoriteBorderIcon") {
            setFavorite(
                <Zoom in={true}>
                    <Favorite className={classes.favoriteIcon} />
                </Zoom>
            )
        } else {
            setFavorite(<FavoriteBorder className={classes.favoriteIcon} />)
        }
    }

    const title = `${props.name} ${props.type}`

    useEffect(() => {
        if (props.type === '(MEAL)') {
            setIcon(mealIcon);
        } else if (props.type === '(MINIEVENT)') {
            setIcon(miniEvent);
        } else if (props.type === '(WORKSHOP)') {
            setIcon(workshopIcon);
        } else if (props.type === '(SPEAKER)') {
            setIcon(speakerIcon)
        } else {
            setIcon(defaultIcon);
        }
    }, [props.type])

    return (
        <Paper className={classes.root}>
            <div className={classes.eventHeader}>
                <Typography style={{ flexGrow: 1 }} variant="h6">
                    {title}
                </Typography>

                <Typography className={classes.time} variant="h6">
                    {props.fullTime}
                </Typography>
                <Avatar className={classes.iconSize} variant="rounded" src={icon} />
            </div>
            <br />
            <Divider />
            <br />
            <div className={classes.eventInfo}>
                <Typography paragraph>
                    {props.description}
                </Typography>
            </div>
            <div className={classes.footer}>
                {
                    props.url !== "" ? (
                        <Button style={{ flexGrow: 1, background: "#F59EA5" }} href={props.url} target="_blank" variant="contained">
                            <Typography variant="body1">
                                Join Livestream
                    </Typography>
                        </Button>
                    ) : (
                            <></>
                        )
                }
                <IconButton onClick={() => changeFavoriteStatus(favorite)} className={classes.favoriteIcon}>
                    {favorite}
                </IconButton>
            </div>
        </Paper>
    );
}

export default Event;
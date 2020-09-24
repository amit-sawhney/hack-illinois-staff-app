import React, { useEffect, useState } from 'react';
import { Avatar, Button, Divider, Link, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import mealIcon from '../../mealIcon.svg'
import miniEvent from '../../miniEvent.svg';
import workshopIcon from '../../workshopIcon.svg';
import speakerIcon from '../../speakerIcon.svg';
import defaultIcon from '../../defaultIcon.svg';

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
    time: {
        
    }
}));

const Event = (props) => {
    const classes = useStyles();
    const [icon, setIcon] = useState();


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
                <Link href = {props.url}>
                    <Button>
                        Join Livestream
                    </Button>
                </Link>
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
        </Paper>
    );
}

export default Event;
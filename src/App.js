import React, { useEffect, useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Divider, Toolbar, Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import Event from './Components/Event/Event'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: '15%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '15%',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: 'auto'
  },
  dayItem: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    textAlign: 'center'
  },
  activeDay: {
    color: '#ec2a39',
    borderBottom: '2px solid #ec2a39',
    paddingBottom: theme.spacing(1.5)
  }
}));

const App = () => {
  const classes = useStyles();

  const [events, setEvents] = useState([[{}]])
  const [day, setDay] = useState(0);

  const formatTime = (unix_time) => {
    let date = new Date(unix_time * 1000 + 3600);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let daySplit = "PM";
    let day = date.getDay();
    let month = date.getMonth();
    let dayOfMonth = date.getDate();

    if (hours > 12) {
      hours -= 12;
      daySplit = "PM"
    }

    let formattedTime = hours + ':' + minutes.substr(-2) + ' ' + daySplit;

    let dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return [formattedTime, dayOfWeek[day], monthOfYear[month], dayOfMonth];
  }

  async function getEvents() {
    const response = await fetch('https://api.hackillinois.org/event/');
    const json = await response.json();

    let modified_json = [];

    json.events.forEach(event => {

      let startTime = formatTime(event.startTime);

      const new_json = {
        unix: parseInt(event.startTime),
        id: event.id,
        name: event.name,
        description: event.description,
        startTime: startTime[0],
        dayOfWeek: startTime[1],
        dayOfMonth: startTime[3],
        month: startTime[2],
        endTime: formatTime(event.endTime)[0],
        fullDate: "",
        eventType: event.eventType,
        url: "",
      }

      if (event.sponsor.length > 0) {
        console.log("hi")
      }

      if (new_json.eventType === "OTHER") {
        new_json.eventType = "";
      } else {
        new_json.eventType = `(${new_json.eventType})`
      }
      let url_idx = new_json.description.indexOf('http');
      if (url_idx !== -1) {
        let url = new_json.description.substr(url_idx);
        if (url.substr(-1) === "!") {
          url = url.substr(0, url.length - 1)
        }
        new_json.url = url;
      }

      let format_date = `${new_json.startTime} - ${new_json.endTime}`;
      new_json.fullDate = format_date;

      modified_json.push(new_json);
    });
    modified_json.sort(function (a, b) {
      return a.unix - b.unix;
    })

    let sorted_json = [];
    let first_day = 7;
    let temp = [];

    modified_json.forEach(event => {
      if (parseInt(event.dayOfMonth) === first_day) {
        temp.push(event);
      } else {
        sorted_json.push(temp);
        temp = [event];
        first_day++;
      }
    });

    sorted_json.push(temp)
    sorted_json.push([]);

    setEvents(sorted_json);
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" style={{ background: 'white' }} className={classes.appBar}>
        <Toolbar>
          <img alt="Hack Illinois Logo" style={{ maxWidth: '7%', flexGrow: 1 }} src="https://2020.hackillinois.org/static/media/logo.01347610.svg" />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Favorites'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['August 7th', 'August 8th', 'August 9th', 'August 10th', 'August 11th', 'August 12th', 'August 13th', 'August 14th', 'August 15th'].map((text, index) => (
              <ListItem button key={text}>
                {index === day ? (
                  <ListItemText className={classes.activeDay} primary={text} />
                ) : (
                    <ListItemText onClick={() => setDay(index)} primary={text} />
                  )}
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {events[day].map(event => (
          // <p>{event.name}</p>
          <Event
            key = {event.id}
            name={event.name}
            start={event.startTime}
            end={event.endTime}
            description={event.description}
            type={event.eventType}
            fullTime={event.fullDate}
            url = {event.url}
          />
        ))}
      </main>
    </div>
  );
}

export default App;

import React from 'react';
import store from './store.js';
import MonthSwitcher from './monthSwitcher.js';
import { monthMap, daysInMonth } from './dateMap.js';
import Calendar from './calendar.js';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  componentDidMount() {
    axios
      .get('/events')
      .then(res => {
        console.log('all events = ', res.data);
        return res.data;
      })
      .then(events => {
        this.unsubscribe = store.subscribe(() =>
          this.setState(store.getState())
        );
        return events;
      })
      .then(events => {
        store.dispatch({ type: 'fetchEvents', data: { events } });
      })
      .catch(err => {
        console.log('error fetching events ', err);
      });
  }
  render() {
    return (
      <div>
        <MonthSwitcher />
        <Calendar />
      </div>
    );
  }
}

export default App;

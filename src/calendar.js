import React from 'react';
import store from './store.js';
import { daysInMonth } from './dateMap.js';
import DateTile from './dateTile.js';

const Calendar = props => {
  const state = store.getState();
  console.log('rendering calendar with state = ', state);
  const eventsThisMonth = state.events
    ? state.events.reduce((filtered, event) => {
        if (!filtered[`${event.day}_${event.month}_${event.year}`]) {
          filtered[`${event.day}_${event.month}_${event.year}`] = [event];
        } else {
          filtered[`${event.day}_${event.month}_${event.year}`].push(event);
        }
        return filtered;
      }, {})
    : [];
  console.log('FILTERED EVENTS = ', eventsThisMonth);
  return (
    <div className="all-date-container">
      {Array.from({ length: daysInMonth[state.currentMonth] }).map(
        (el, index) => (
          <DateTile
            data-date={`${index + 1}_${state.currentMonth}_${
              state.currentYear
            }`}
            key={Math.random() * 100000000}
            day={index + 1}
            eventsThisDay={
              eventsThisMonth[
                `${index + 1}_${state.currentMonth}_${state.currentYear}`
              ]
            }
          />
        )
      )}
    </div>
  );
};

export default Calendar;

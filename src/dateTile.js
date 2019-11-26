import React from 'react';
import store from './store.js';
import { monthMap, daysInMonth } from './dateMap.js';
import EventCreation from './eventCreation.js';
import Event from './event.js';

const DateTile = props => {
  const state = store.getState();
  console.log('date tile rendering with props ', props);
  return (
    <div className="card date-card" style={{ width: '15rem' }}>
      <EventCreation
        id={`form-${monthMap[state.currentMonth]}-${props.day}-${
          state.currentYear
        }`}
        date={{
          day: props.day,
          month: state.currentMonth,
          year: state.currentYear
        }}
      />
      <div
        id={`card-body-${monthMap[state.currentMonth]}-${props.day}-${
          state.currentYear
        }`}
        className="card-body"
      >
        <h5 className="card-title">
          {`${monthMap[state.currentMonth]} ${props.day} ${state.currentYear}`}
        </h5>
        <div className="all-events-container">
          {props.eventsThisDay
            ? props.eventsThisDay.map(event => (
                <p key={event.id} className="card-text">
                  <Event event={event} />
                </p>
              ))
            : `You don't have any events for this day`}
        </div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            document.getElementById(
              `card-body-${monthMap[state.currentMonth]}-${props.day}-${
                state.currentYear
              }`
            ).style.height = '0px';
            document.getElementById(
              `form-${monthMap[state.currentMonth]}-${props.day}-${
                state.currentYear
              }`
            ).style.height = '35em';
            document.getElementById(
              `form-${monthMap[state.currentMonth]}-${props.day}-${
                state.currentYear
              }`
            ).style.display = 'flex';
          }}
        >
          Add Event
        </button>
      </div>
    </div>
  );
};

export default DateTile;

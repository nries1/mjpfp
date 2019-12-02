import React from 'react';
import store from './store.js';
import { monthMap, daysInMonth } from './dateMap.js';
import EventCreation from './eventCreation.js';
import Event from './event.js';

const DateTile = props => {
  const state = store.getState();
  return (
    <div
      className="card date-card"
      data-date={`${props.day}-${state.currentMonth}-${state.currentYear}`}
    >
      <EventCreation
        className="event-creation-form"
        id={`form-${monthMap[state.currentMonth]}-${props.day}-${
          state.currentYear
        }`}
        data-date={`${props.day}-${state.currentMonth}-${state.currentYear}`}
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
        data-date={`${props.day}-${state.currentMonth}-${state.currentYear}`}
        className="card-body"
      >
        <h5
          className="card-title"
          data-date={`${props.day}-${state.currentMonth}-${state.currentYear}`}
        >
          {`${monthMap[state.currentMonth]} ${props.day} ${state.currentYear}`}
        </h5>
        <div
          data-date={`${props.day}-${state.currentMonth}-${state.currentYear}`}
          className="all-events-container"
        >
          {props.eventsThisDay
            ? props.eventsThisDay.map(event => (
                <Event
                  key={event.id}
                  data-date={`${props.day}-${state.currentMonth}-${state.currentYear}`}
                  event={event}
                />
              ))
            : `You don't have any events for this day`}
        </div>
        <button
          data-date={`${props.day}-${state.currentMonth}-${state.currentYear}`}
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

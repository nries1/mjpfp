/* eslint-disable no-alert */
import React from 'react';
import axios from 'axios';
import { monthMap, daysInMonth } from './dateMap.js';
import store from './store.js';

const EventCreation = props => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!e.target.title.value || !e.target.description.value) {
          window.alert('fill out all the fields pls.');
          return;
        }
        axios
          .post('/create-event', {
            title: e.target.title.value,
            description: e.target.description.value,
            day: props.date.day,
            month: props.date.month,
            year: props.date.year
          })
          .then(res => {
            console.log(res);
            document.getElementById(props.id).style.display = 'none';
            document.getElementById(props.id).style.height = '0em';
            axios
              .get('/events')
              .then(eventsDb => {
                console.log('all events = ', eventsDb.data);
                return eventsDb.data;
              })
              .then(events => {
                store.dispatch({ type: 'fetchEvents', data: { events } });
              });
          })
          .catch(error => {
            console.error('posting event error ', error);
          });
      }}
      className="event-creation-form"
      id={props.id}
      style={{ display: 'none' }}
    >
      <div>Create an Event</div>
      <div className="form-group">
        <label htmlFor="title">Title: </label>
        <input className="form-control" name="title" id="title" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description: </label>
        <textarea
          className="form-control"
          name="description"
          id="description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="day">Day: </label>
        <input
          className="form-control"
          name="day"
          id="day"
          value={props.date.day}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="month">Month: </label>
        <input
          className="form-control"
          name="month"
          id="month"
          value={monthMap[props.date.month]}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="year">Year: </label>
        <input
          className="form-control"
          name="year"
          id="year"
          value={props.date.year}
          readOnly
        />
      </div>
      <button type="submit" className="btn btn-outline-primary">
        Submit
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => {
          const form = document.getElementById(props.id);
          form.style.display = 'none';
          form.nextElementSibling.style.height = '100%';
        }}
      >
        Back
      </button>
    </form>
  );
};

export default EventCreation;

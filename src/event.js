import React from 'react';
import store from './store.js';
import Axios from 'axios';

const Event = props => {
  return (
    <div id={`event-${props.event.id}`}>
      <div className="event-card">{props.event.title}</div>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        onClick={() => {
          Axios.delete(`/${props.event.id}`)
            .then(response => {
              console.log('delete response ', response);
              store.dispatch({
                type: 'deleteEvent',
                data: {
                  eventId: props.event.id
                }
              });
              document.getElementById(`event-${props.event.id}`).style.display =
                'none';
            })
            .catch(error => {
              console.log('error deleting event ', error);
            });
        }}
      >
        X
      </button>
    </div>
  );
};

export default Event;

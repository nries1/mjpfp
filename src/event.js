import React from 'react';
import store from './store.js';
import Axios from 'axios';

const findNearstDomElementDate = (
  coordinates,
  elementDimensions,
  elementDate
) => {
  let nearestElements = [];
  //above
  // nearestElements.push(
  //   document.elementFromPoint(coordinates.left, coordinates.top + 5)
  // );
  // //below
  // nearestElements.push(
  //   document.elementFromPoint(
  //     coordinates.left,
  //     coordinates.top - (elementDimensions.width + 5)
  //   )
  // );
  // //right
  // nearestElements.push(
  //   document.elementFromPoint(
  //     coordinates.left + elementDimensions.width + 5,
  //     coordinates.top
  //   )
  // );
  // //left
  // nearestElements.push(
  //   document.elementFromPoint(coordinates.left + 5, coordinates.top)
  // );
  //above-left
  nearestElements.push(
    document.elementFromPoint(coordinates.left - 1, coordinates.top - 1)
  );
  //above-right
  nearestElements.push(
    document.elementFromPoint(
      coordinates.left + elementDimensions.width + 2,
      coordinates.top - 1
    )
  );
  //below-left
  // nearestElements.push(
  //   document.elementFromPoint(
  //     coordinates.left - 5,
  //     coordinates.top + (elementDimensions.height + 2)
  //   )
  // );
  // //below-right
  // nearestElements.push(
  //   document.elementFromPoint(
  //     coordinates.left + elementDimensions.width + 5,
  //     coordinates.top + (elementDimensions.height + 2)
  //   )
  // );
  for (let i = 0; i < nearestElements.length; i++) {
    if (!nearestElements[i]) continue;
    if (nearestElements[i].dataset.date !== elementDate) {
      return nearestElements[i].dataset.date;
    }
  }
};

const Event = props => {
  window.movingElement = false;
  window.currentElement = null;
  return (
    <div
      data-date={`${props.event.day}-${props.event.month}-${props.event.year}`}
      className="event-container"
      id={`event-${props.event.id}`}
      onMouseDown={e => {
        console.log(e.clientX - document.body.getBoundingClientRect().left);
        const element = document.getElementById(`event-${props.event.id}`);
        element.style['z-index'] = '10';
        window.movingElement = true;
        window.currentElement = element;
      }}
      onMouseUp={() => {
        //THIS NEEDS TO BE ON GLOBAL
        window.movingElement = false;
        const eventId = window.currentElement.id.replace(/event-/, '');
        const elementPosition = window.currentElement.getBoundingClientRect();
        const nearestDomElementDate = findNearstDomElementDate(
          {
            left: elementPosition.left,
            top: elementPosition.top
          },
          { width: elementPosition.width, height: elementPosition.height },
          window.currentElement.dataset.date
        );
        if (nearestDomElementDate) {
          const [day, month, year] = nearestDomElementDate.split('-');
          Axios.put(`/update-event/${eventId}`, {
            day,
            month,
            year
          })
            .then(() => {
              Axios.get('/events')
                .then(res => res.data)
                .then(events => {
                  store.dispatch({ type: 'fetchEvents', data: { events } });
                })
                .catch(err => {
                  console.log('ERROR FETCHING EVENTS ', err);
                });
            })
            .catch(error => {
              console.log('ERROR UPDATING EVENT ', error);
            });
        }
      }}
      onMouseMove={e => {
        if (!window.movingElement) return;
        window.currentElement.style.position = 'absolute';
        //HOW DO YOU PREVENT THE ELEMENT FROM MOVING WHEN YOU MAKE IT ABSOLUTE??
        // const startCoordinates = window.currentElement.getBoundingClientRect();
        // const elementPosition = window.currentElement.getBoundingClientRect();
        // const startCoordintates = {
        //   left: elementPosition.left,
        //   top: elementPosition.top
        // };

        // window.currentElement.style.transform = `translate3d(0px, 0px, 0px)`;
        // window.currentElement.style.transform = `translate3d(${e.clienX}px,${e.clientY}px,0px)`;

        const elemWidth = window.currentElement.style.width.replace(/px/, '');
        const elemHeight = window.currentElement.style.height.replace(/px/, '');
        const currentX = Number(
          window.currentElement.style.left.replace(/px/, '')
        );
        const currentY = Number(
          window.currentElement.style.top.replace(/px/, '')
        );
        window.currentElement.style.left = `${currentX +
          e.movementX -
          elemWidth / 2}px`;
        window.currentElement.style.top = `${currentY +
          e.movementY -
          elemHeight}px`;
      }}
    >
      <div
        className="event-card"
        data-date={`${props.event.day}-${props.event.month}-${props.event.year}`}
      >
        {props.event.title}
      </div>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        data-date={`${props.event.day}-${props.event.month}-${props.event.year}`}
        onClick={() => {
          Axios.delete(`/${props.event.id}`)
            .then(response => {
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

import React from 'react';
import store from './store.js';

const MonthSwitcher = () => {
  const state = store.getState();
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          console.log('decreasing month');
          const month =
            state.currentMonth === 0 ? 11 : Number(state.currentMonth) - 1;
          const year =
            state.currentMonth === 0
              ? Number(state.currentYear) - 1
              : state.currentYear;
          console.log('month ', month);
          store.dispatch({
            type: 'changeMonth',
            data: {
              month,
              year
            }
          });
        }}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          console.log('increasing month');
          const month =
            state.currentMonth === 11 ? 0 : Number(state.currentMonth) + 1;
          const year =
            state.currentMonth === 11
              ? Number(state.currentYear) + 1
              : state.currentYear;
          console.log('month ', month);
          store.dispatch({
            type: 'changeMonth',
            data: {
              month,
              year
            }
          });
        }}
      >
        Next
      </button>
    </div>
  );
};

export default MonthSwitcher;

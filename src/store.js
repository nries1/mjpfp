import { createStore, combineReducers } from 'Redux';
const today = new Date();
const initialState = {
  currentMonth: today.getMonth(),
  currentYear: today.getFullYear(),
  events: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'changeMonth':
      return {
        currentMonth: action.data.month,
        currentYear: action.data.year,
        events: state.events
      };
    case 'fetchEvents':
      return {
        currentMonth: state.currentMonth,
        currentYear: state.currentYear,
        events: action.data.events
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

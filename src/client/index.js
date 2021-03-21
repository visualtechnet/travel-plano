import './styles/main.scss';

import { initValidation, initDatePicker } from './js/common';
import * as trip from './js/trip';

const initialize = () => {
  initValidation(trip.controls.formTripPlan);
  initDatePicker('travelDate', (start, end) => {
    console.log('Travel Date', start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
  });
  trip.initTrip();
};

window.addEventListener('DOMContentLoaded', initialize);

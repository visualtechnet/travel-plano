import './styles/main.scss';

import { initValidation, initDatePicker } from './js/common';
import * as trip from './js/trip';

const initialize = () => {
  initValidation(trip.controls.formTripPlan);
  initDatePicker('travelDate');
  trip.initTrip();
};

window.addEventListener('DOMContentLoaded', initialize);

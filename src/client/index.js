import './styles/main.scss';

import { initValidation } from './js/common';
import * as trip from './js/trip';

const initialize = () => {
  initValidation(trip.controls.formTripPlan);
  trip.initTrip();
};

window.addEventListener('DOMContentLoaded', initialize);

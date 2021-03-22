import { getData, saveData } from './dataStore';
import { MYTRIPS, DATEFORMAT } from './contant';
import { extractDestination } from './common';

const controls = {
  formTripPlan: document.querySelector('form[name="tripPlan"]'),
  name: document.querySelector('input[name="tripName"]'),
  destination: document.querySelector('input[name="location"]'),
  travelDate: $('input[name="travelDate"'),
  travelList: document.querySelector('section.travelList'),
};

const saveTrip = (name, destination, startDate, endDate) => {
  const trips = getData(MYTRIPS) || [];
  const currentTripIdx = trips.findIndex((trip) => trip.name === name);
  let allTrips = [];

  if (currentTripIdx === -1) {
    allTrips = [...trips, {
      name,
      destination,
      startDate,
      endDate,
    }];
  } else {
    const updatedTrip = {
      ...trips[currentTripIdx], name, destination, startDate, endDate,
    };

    allTrips = [
      ...trips.splice(currentTripIdx, 1),
      updatedTrip,
    ];
  }

  saveData(MYTRIPS, allTrips);
};

const getTrips = () => getData(MYTRIPS) || [];

const loadTrips = () => {
  const allTrips = getTrips();
};

const initTrip = () => {
  controls.formTripPlan.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const name = controls.name.value;
    const destination = extractDestination(controls.destination.value);
    const { startDate, endDate } = controls.travelDate.data('daterangepicker');

    console.log(name, destination);
    // saveTrip(name.value, destination.value, startDate.format(DATEFORMAT), endDate.format(DATEFORMAT));

    return false;
  });

  loadTrips();
};

export {
  saveTrip, getTrips, initTrip, controls,
};

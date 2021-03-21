import { getData, saveData } from './dataStore';
import { MYTRIPS } from './contant';

const controls = {
  formTripPlan: document.querySelector('form[name="tripPlan"]'),
  tripName: document.querySelector('form[name="tripName"]'),
  tripLocation: document.querySelector('form[name="location"]'),
};

const initTrip = () => {
  controls.formTripPlan.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    return false;
  });
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

export {
  saveTrip, getTrips, initTrip, controls,
};

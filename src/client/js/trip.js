/* eslint-disable camelcase */
import moment from 'moment';
import { getData, saveData } from './dataStore';
import { MYTRIPS, DATEFORMAT, TRAVEL_SERVER_URL } from './contant';

const controls = {
  formTripPlan: document.querySelector('form[name="tripPlan"]'),
  name: document.querySelector('input[name="tripName"]'),
  destination: $('select[name="location"]'),
  travelDate: $('input[name="travelDate"'),
  travelList: $('section[name=travelList]'),
};

const saveTrip = (name, destination, startDate, endDate, forecast, pix) => {
  const trips = getData(MYTRIPS) || [];
  const currentTripIdx = trips.findIndex((trip) => trip.name === name);
  let allTrips = [];

  if (currentTripIdx === -1) {
    allTrips = [...trips, {
      name,
      destination,
      startDate,
      endDate,
      forecast,
      pix,
    }];
  } else {
    const updatedTrip = {
      ...trips[currentTripIdx], name, destination, startDate, endDate, forecast, pix,
    };

    allTrips = [
      ...trips.splice(currentTripIdx, 1),
      updatedTrip,
    ];
  }

  saveData(MYTRIPS, allTrips);
};

const removeTrip = (name) => {
  const trips = getData(MYTRIPS) || [];
  const currentTripIdx = trips.findIndex((trip) => trip.name === name);
  const newTrips = [
    ...trips.slice(currentTripIdx, 1),
  ];

  saveData(MYTRIPS, newTrips);
};

const getTrips = () => getData(MYTRIPS) || [];

const loadTrips = () => {
  const placeholderDefault = 'https://via.placeholder.com/150';
  const allTrips = getTrips();

  controls.travelList.html('');

  allTrips.forEach((trip, index) => {
    const {
      name, destination, forecast, pix, startDate,
    } = trip;
    const { city, countryCode } = destination;
    const randomPix = Math.floor(Math.random() * pix.length);
    const { previewURL } = (pix && pix[randomPix]) || { previewURL: placeholderDefault };
    const targetWeather = forecast && forecast.data.filter((data) => {
      const current = moment(data.datetime);
      const target = moment(startDate);
      return target.diff(current, 'days') >= -1;
    });
    const forcastedWeather = targetWeather && targetWeather[0];

    const travelItem = $(`
      <div class="card travel-item">
        <div class="card-header bg-warning"><h4 class="p-2">${name}</h4></div>
        <div class="card-body d-flex justify-content-space-between">
          <img src="${previewURL || placeholderDefault}" title="${name}" class="mr-10" />
          <div>
              <h3>My Trip to: ${city}, ${countryCode}</h3><br />
              <div>Departing: ${startDate}</div><br />
              <p>Typical weather for then is </p><br />
              <p>${forcastedWeather.weather.description}</p>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end">
          <button name="travelRemove" class="btn btn-secondary" travel="${name}" type="button">Remove</button>
        </div>
      </div>
      `);

    controls.travelList.append(travelItem);
  });

  const travelRemoveCtl = $('button[name*=travelRemove]');

  travelRemoveCtl.on('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const name = $(this).attr('travel');
    removeTrip(name);
  });
};

const getDailyForecast = async (lat, lng) => {
  const url = `${TRAVEL_SERVER_URL}/weather/postal/${lat}/${lng}`;
  const result = await fetch(url).then((res) => res.json());

  return result;
};

const getPhotoDestination = async (query) => {
  const url = `${TRAVEL_SERVER_URL}/pixlocation/${escape(query)}`;
  const result = await fetch(url).then((res) => res.json());

  return result;
};

const saveTravelDestination = async (name, destination, startDate, endDate) => {
  const { lat, lng } = destination;
  let forecast = null;

  await getDailyForecast(lat, lng).then(async (res) => {
    forecast = res;
    const { city_name } = forecast;
    const searchLocation = `${city_name.trim().replace('-', ' ')}`;
    await getPhotoDestination(searchLocation).then((pix) => {
      const { hits } = pix;
      const pixList = hits && hits.slice(0, 3);

      saveTrip(name, destination, startDate, endDate, forecast, pixList);
      loadTrips();
    });
  });
};

const formatTrip = (trip) => {
  const { countryCode, placeName } = trip;
  const $container = $(
    '<div class=\'select2-result-trip d-flex justify-content-space-between clearfix\'>'
      + `<div class='select2-result-trip__placeName'><b>${placeName || ''}</b></div><div class='select2-result-trip__countryCode ml-10'>&nbsp;&nbsp;${countryCode || ''}</div>`
    + '</div>',
  );

  return $container;
};

const formatTripSelection = (trip) => trip.placeName || trip.text;

const initTrip = () => {
  // initialize dropdonw
  controls.destination.select2({
    theme: 'bootstrap4',
    ajax: {
      url: `${TRAVEL_SERVER_URL}/geolocation`,
      dataType: 'json',
      delay: 500,
      data: (params) => {
        const query = {
          postalcode: params.term,
        };

        return query;
      },
      processResults(data, params) {
        const page = params.page || 1;

        return {
          results: data.postalCodes,
          pagination: {
            more: page * 10 < data.postalCodes.length,
          },
        };
      },
    },
    placeholder: 'Enter Postal Code',
    minimumInputLength: 5,
    templateResult: formatTrip,
    templateSelection: formatTripSelection,
  });

  controls.formTripPlan.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const name = controls.name.value;
    const destObject = controls.destination.select2('data')[0];
    const { startDate, endDate } = controls.travelDate.data('daterangepicker');
    const destination = {
      lat: destObject.lat,
      lng: destObject.lng,
      postalCode: destObject.postalCode,
      city: destObject.placeName,
      state: destObject.adminCode1,
      countryCode: destObject.countryCode,
    };

    await saveTravelDestination(name, destination, startDate.format(DATEFORMAT), endDate.format(DATEFORMAT));

    return false;
  });

  loadTrips();
};

export {
  saveTrip, getTrips, initTrip, controls, removeTrip,
};

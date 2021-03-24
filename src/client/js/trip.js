/* eslint-disable camelcase */
import moment from 'moment';
import { getData, saveData } from './dataStore';
import { MYTRIPS, TRAVEL_SERVER_URL } from './contant';
import { element } from './common';

const controls = {
  formTripPlan: document.querySelector('form[name="tripPlan"]'),
  name: document.querySelector('input[name="tripName"]'),
  destination: document.querySelector('input[name="location"]'),
  travelFromDate: document.querySelector('input[name="travelFromDate"]'),
  travelToDate: document.querySelector('input[name="travelToDate"]'),
  travelList: document.querySelector('section[name="travelList"]'),
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
    const newTrips = trips.filter((trip) => trip.name !== name);
    const updatedTrip = {
      ...trips[currentTripIdx], name, destination, startDate, endDate, forecast, pix,
    };

    allTrips = [
      ...newTrips,
      updatedTrip,
    ];
  }

  saveData(MYTRIPS, allTrips);
};

const removeTrip = (name) => {
  const trips = getData(MYTRIPS) || [];
  const newTrips = trips.filter((trip) => trip.name !== name);

  saveData(MYTRIPS, newTrips);
};

const getTrips = () => getData(MYTRIPS) || [];

const loadTrips = () => {
  const placeholderDefault = 'media/no-image.jpg';
  const allTrips = getTrips();

  controls.travelList.innerHTML = '';

  allTrips.forEach((trip) => {
    const {
      name, destination, forecast, pix, startDate, endDate,
    } = trip;
    const { city, countryCode } = destination;
    const randomPix = Math.floor(Math.random() * pix.length);
    const { previewURL } = (pix && pix[randomPix]) || { previewURL: placeholderDefault };
    const targetWeather = forecast && forecast.data.filter((data) => {
      const current = moment(data.datetime);
      const target = moment(startDate);
      return target.diff(current, 'days') >= -1;
    });
    const forecastedWeather = targetWeather && targetWeather[0];
    const nowMoment = moment();
    const momentStartDate = moment(startDate);
    const diffInDays = momentStartDate.diff(nowMoment, 'days');

    const travelContainer = element('div', ['card', 'travel-item']);
    const travelHeader = element('div', ['card-header']);
    const travelH4 = element('h2');
    travelH4.innerHTML = name;
    const travelBody = element('div', ['card-body']);
    const pin = element('i', ['pin']);
    travelContainer.append(pin);
    // TravelImage
    const travelImgContainer = element('div', ['card-img-container', 'card-body-item']);
    travelImgContainer.setAttribute('style', `background-image: url('${previewURL}')`);
    travelBody.append(travelImgContainer);

    // TravelInfo
    const travelInfo = element('div', ['card-info', 'card-body-item']);
    const infoH3 = element('h4');
    const infoDeparting = element('p', ['info-departure']);
    const infoDaysAway = element('p', ['info-daysaway']);
    const bRemove = element('button', ['btn']);
    bRemove.setAttribute('name', 'travelRemove');
    bRemove.setAttribute('travel', name);
    bRemove.innerHTML = 'remove trip';
    const infoWeatherForecast = element('p', ['info-forecast']);
    infoH3.innerHTML = `My Trip to ${city}, ${countryCode}`;
    infoDeparting.innerHTML = `Departing from <b>${startDate}</b> to <b>${endDate}</b>`;
    infoDaysAway.innerHTML = `${city} is ${diffInDays} days away`;
    infoWeatherForecast.innerHTML = `Typical weather will be ${forecastedWeather.weather.description} with a temp high of ${forecastedWeather.high_temp}&deg;C and ${forecastedWeather.low_temp}&deg;C`;
    travelInfo.append(infoH3);
    travelInfo.append(infoDeparting);
    travelInfo.append(bRemove);
    travelInfo.append(infoDaysAway);
    travelInfo.append(infoWeatherForecast);
    travelBody.append(travelInfo);

    travelHeader.append(travelH4);
    travelContainer.append(travelHeader);
    travelContainer.append(travelBody);

    controls.travelList.append(travelContainer);
  });

  const buttonsRemove = document.querySelectorAll('button[name*=travelRemove]');

  buttonsRemove.forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const name = el.getAttribute('travel');
      removeTrip(name);
      loadTrips();
    });
  });
};

const getGeoLocation = async (placename) => {
  const url = `${TRAVEL_SERVER_URL}/geolocation/location?placename=${placename}`;
  const result = await fetch(url).then((res) => res.json());

  return result;
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

const saveTravelDestination = async (name, placename, startDate, endDate) => {
  let forecast = null;

  const result = await getGeoLocation(placename).then(async (geo) => {
    const {
      lat, lng, postalCode, placeName, adminCode1, countryCode,
    } = geo && geo.postalCodes.length > 0 && geo.postalCodes[0];

    const destination = {
      lat,
      lng,
      postalCode,
      city: placeName,
      state: adminCode1,
      countryCode,
    };

    return await getDailyForecast(destination.lat, destination.lng).then(async (dailyForecast) => {
      forecast = dailyForecast;
      if (destination.city && destination.city.length === 0) {
        // eslint-disable-next-line no-alert
        alert('Destination not found');
        return false;
      }

      return await getPhotoDestination(destination.city).then((pix) => {
        const { hits } = pix;
        const pixList = hits && hits.slice(0, 3);

        saveTrip(name, destination, startDate, endDate, forecast, pixList);
        loadTrips();
      });
    });
  });

  return result;
};

const initTrip = () => {
  controls.formTripPlan.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const name = controls.name.value;
    const placename = controls.destination.value;
    const startDate = controls.travelFromDate.value;
    const endDate = controls.travelToDate.value;

    await saveTravelDestination(name, placename, startDate, endDate);

    return false;
  });

  loadTrips();
};

export {
  saveTrip, getTrips, initTrip, controls, removeTrip,
};

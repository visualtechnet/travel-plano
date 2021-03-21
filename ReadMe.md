# Travel Plano

## Table of Contents

1. [Project Summary](#project-summary)
2. [Getting Started](#getting-started)
3. [Hosting](#hosting)

## Project Summary

This project aims to give you the opportunity to put all of the skills you have learned into one project to build your own custom travel app. Due to the nature of this course, it is very JavaScript heavy, but it is still expected you create clean and appealing HTML/CSS. You will also be targeting the DOM, working with objects, and retrieving data from 3 APIs in which one of those is reliant on another to work. Finally, this is all going to be done in a Webpack environment, using an express server, and wrapped up with service workers.

For this project, refactor and test as much as possible while you are building. You should figure for every piece of functionality you add, you will likely spend just as much time testing and refactoring your code. If it takes you 5 hours to figure out the logic, it should likely take you another 5 hours determining that you wrote the best code possible. As your skills improve, this process will feel more natural. Make sure to remove any debugging code from your final submission.

The minimum requirements ask a fair amount from you, but the final app is quite simple. A roadmap to expand on the application and make it uniquely your own is provided.

You will be building a travel application. It’s common to pull basic data from an API, but many applications don’t just pull the weather, they pull in multiple types of data, from different sources and occasionally one API will be required to get data from another API.

The project will include a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast. The OpenWeather API is fantastic but it doesn’t let you get future data for free and it’s not that flexible with what information you enter; we are going to use the Weatherbit API for you to see how another API accomplishes the same goals. Weatherbit API has one problem, it only takes in coordinates for weather data -- it’s that specific. So, we’ll need to get those coordinates from the Geonames API. Once we have all of this data, we’ll want to display an image of the location entered; for this, we will be using the Pixabay API.

This may not sound like a lot, but there is a fair amount of moving pieces that rely on each other to work. You’ll need to plan out the logic of what you are trying to accomplish before you begin developing. There are a lot of paths you can take, and what you choose to display and how you display it is somewhat flexible. It is highly recommended that after you meet the minimum requirements in the rubric, you continue debugging the UX and improve the project.

![Project Requirement Sample Mockup](assets/travel-app-project-mockup.png)

## Getting Started

1. Clone app here

```
git clone https://github.com/visualtechnet/travel-plano.git
```
2. Create a GeoNames account [http://www.geonames.org/](https://www.weatherbit.io/) and add your username in step #4
3. Sign up to WeatherBit API [https://www.weatherbit.io/](https://www.weatherbit.io/) and add your api in step #4
4. Sign up for Pixabay Account [https://pixabay.com/](https://pixabay.com/) and add your api key in step #4
5. Create an environment file, .env
```
PORT=
GEONAMES_USERNAME=
WEATHERBIT_APIKEY=
PIXABAY_APIKEY=
```

## Additional References

1. [Rest Countries EU](https://restcountries.eu/#api-endpoints-all) to pull in data for the country being visited.


## Hosting

You can find the site here:

[https://xenodochial-goodall-7badb2.netlify.app/](https://xenodochial-goodall-7badb2.netlify.app/)

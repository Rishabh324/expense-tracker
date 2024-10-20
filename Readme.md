# Weather Monitoring System

## Github link (https://github.com/Rishabh324/zeotap_weather_monitoring)

## Description

A web application designed to deliver real-time weather updates for major metro cities in India. It leverages the OpenWeatherMap API to fetch live weather information and offers alerts for specific weather conditions and temperature thresholds along with a summarized overview of key weather statistics.

## Hosting

The project is hosted in public registry on docker. You can pull the image by searching for two images on docker hub. The image names are:

1. rishabhsinha324/weather-monitoring-system-weather-frontend

After pulling the image, run the docker run command and perform the port mapping by adding 3000:3000 to the command.

## How to run the application

1. Using docker:

- Install the docker desktop application from https://www.docker.com/products/docker-desktop

- Create a .env.local file with the following content:

```
  NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
  MONGODB_URI=mongodb://mongo:27017
```

- Get the OpenWeatherMap API key from https://openweathermap.org/. Store it in the .env.local file.

- Run the application using docker-compose:

```bash
docker-compose up
```

1. Without docker:

- Create a .env.local file with the following content:

```
  NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
  MONGODB_URI=mongodb://localhost:27017
```

- Get the OpenWeatherMap API key from https://openweathermap.org/. Store it in the .env.local file.
- Run the application using `npm run dev`

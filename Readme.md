# Weather Monitoring System

## Github link (https://github.com/Rishabh324/zeotap_weather_monitoring)

## Description

This Expense Tracker Application is designed expenses effectively. Users can add expenses, split them among participants. The application supports three methods of splitting expenses:

1. Equal Split: The total expense is divided equally among all participants.
2. Exact Split: Specific amounts are assigned to each participant based on what they owe.
3. Percentage Split: The total is split based on custom percentages assigned to each participant.

Key features include:

1. User Management: Each user has a unique profile with details such as email, name, and mobile number.
2. Expense Tracking: Users can add, manage, and retrieve their expenses.
3. Expense Splitting: Advanced methods for splitting expenses among participants.
4. Balance Sheet Download: Users can generate and download a CSV balance sheet summarizing how much each participant owes or is owed.

The application is built using a Node.js backend with MongoDB for data storage and React for the frontend, making it responsive and capable of handling real-time updates to expenses and balances.

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

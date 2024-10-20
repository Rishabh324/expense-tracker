# Expense Tracker Application

## Github link (https://github.com/Rishabh324/expense-tracker)

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
5. The project also uses user authentication and authorization using jwt tokens and redux state management.

The application is built using a Node.js backend with MongoDB for data storage and React for the frontend, making it responsive and capable of handling real-time updates to expenses and balances.

## Hosting

The project is hosted in public registry on docker. You can pull the image by searching for two images on docker hub. The image names are:

1. rishabhsinha324/expense-tracker-expense-frontend
2. rishabhsinha324/expense-tracker-expense-backend

After pulling the image, run the docker run command and perform the port mapping by adding 5173:5173 for frontend and 5000:5000 for backend to the command.

```
  docker run -p <HostPort:containerport> -it imagename:tag 
```

## How to run the application

1. Using docker:

- Install the docker desktop application from https://www.docker.com/products/docker-desktop

- Create a .env file with the following content:

```
  VITE_REACT_APP_BASEURL = http://localhost:5000/api/v1
```

- Run the application using docker-compose:

```bash
docker-compose build
```

```bash
docker-compose up
```

1. Without docker:

- Create a .env file with the following content:

```
  VITE_REACT_APP_BASEURL = http://localhost:5000/api/v1
```

- Run the application using `npm run dev`

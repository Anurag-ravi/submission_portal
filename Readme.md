# Submission Portal

## Submission by:- 
- Team Name: **The Boys**
- Team Members: 
  - Anurag Ravi      (200101017)
  - Ayan Gautam      (200101022)
  - Bhanu Rajput     (200101024)
  - Gaurav Kumar     (200101033)
  - Himanshu Shekhar (200101042)

## Problem Statement
- To build a web application that can be used to submit assignments and projects by students and can be used to evaluate them by teachers.

## Tech Stack
- Frontend: ReactJS, Redux, Tailwind CSS
- Backend: NodeJS, ExpressJS, MongoDB
- Version Control: Git, GitHub
- Deployment: Netlify, Render

## Features
- **Student**
  - Login using Outlook account.
  - Can Enroll in a course using course code and enrollment key.
  - Can view the list of enrolled courses.
  - Can view the list of assignments in a course.
  - Can download the assignment file.
  - Can submit assignment along with a file.
  - Cannot submit after the deadline.
  - Can view the status of their submissions.
  - Can view the feedback given by the TA.
  - Will get an email notification when a new assignment is added to a course.
  - Will get an email notification when their assignment is graded.
  - Will get an email notification when 24 hours are left for the deadline of an assignment.

- **TA**
  - have all the features of a student.
  - Will see the list of courses they are TA of.
  - Can see all submissions for an assignment.
  - Can download the submission file.
  - Can give feedback/grade to a submission.
  - Can add a new assignment to a course.
  - Will get an email notification when deadline of an assignment is crossed.

- **Instructor**
  - have all the features of a TA excluding some specific features of students.
  - Can create a new course.
  - Can see Enrollment key of all involved courses.
  - Can add/remove a TA to a course.

- **Admin**
  - They have specific portal to manage instructors.
  - Can Give/Take Instructor's Privilage to any user.
  - Have to login using a different portal and different credentials.

## How to run the project
- Make sure you have `node` and `npm` installed on your system.
- There are two folders in the project: `frontend` and `backend`.
- To run the frontend, go to the `frontend` folder and run the following commands:
  - `npm install`
  - `npm start`
- Backend code requires a `.env` file in the `backend` folder.
- We are already providing a `.env` file in the `backend` folder.
- Incase you want to use your own `.env` file, make sure to include these variables:-
  - required variables:-
    - `MICROSOFT_CLIENT_ID` : Client ID of your Microsoft Azure App.
    - `MICROSOFT_CLIENT_SECRET` : Client Secret of your Microsoft Azure App.
    - `EMAIL` : Email ID of the sender of the email(only gmail).
    - `PASSWORD` : Generated App Password of the sender of the email(only gmail).
    - `TZ` : Timezone of the server, use `Asia/Kolkata` if you are running the server in India else UTC time will be used.
  - optional variables:-
    - `MONGO_URI` : MongoDB Atlas database Connection String || `mongodb://localhost:27017/<name_of_database>` only if mongoDB is already installed on your system.
    - `PORT` : Port on which the backend will run || `5000` by default.
    - `SALT_ROUNDS` : Number of salt rounds for hashing the password || `10` by default.
    - `JWT_SECRET` : A string which will be used to encode the jwt token || `nclshfcnz,cOIDEUWEC^%&@^*&ww*(@yIWEUN` by default & the admin credentials in our provided database are encoded using this secret so if you change this secret and use our database, you will not be able to login using the admin credentials provided by us.
    - `FRONTEND_URL` : URL of the frontend || `http://localhost:3000` by default.
    - `BACKEND_URL` : URL of the backend || `http://localhost:5000` by default.
- After setting up the `.env` file, run the following commands:
    - `npm install`
    - `npm run dev`
- The frontend will run on `localhost:3000` and the backend will run on `localhost:5000`.
- For `Student`, `TA` and `Instructor`, go to `localhost:3000` and for `Admin`, go to `localhost:3000/admin`.

## Deployment
- The frontend is deployed on `Netlify` and the backend is deployed on `Render`.
- The frontend is deployed at [https://submissionportal.netlify.app/](https://submissionportal.netlify.app/).
- The backend is deployed at [https://submission-portal.onrender.com/](https://submission-portal.onrender.com/).
- The Admin portal can be accessed at [https://submissionportal.netlify.app/admin](https://submissionportal.netlify.app/admin).
- The Backend Deployment is Done using `Free Tier` of Render, so it may take some time to load the page for the first time as after `15 minutes` of inactivity, the server goes to sleep and it takes some time to wake up.


## Credentials
- Admin Credentials:
  - Email: `aaa@aa.com`
  - Password: `1234`
- Only to be used if you are using our database
- We recommend you to use our database as we have already added some courses and assignments in it.

## How to setup and use the project
- There is a `Docs` folder in the project which contains all the documents related to the project.
- We have attached videos in the `videos` folder which shows how to setup the project and how to use it.
- `How to set up azure app.mp4` will help you to generate `Client ID` and `Client Secret` for your Microsoft Azure App.
- `How to create App Password.mp4` will also help you to generate `App Password` for your gmail account.
- `How to set up database.mp4` will help you to setup the database on MongoDB Atlas and get the `Connection String` which will be used in the `.env` file as `MONGO_URI`.
- `Run the project.mp4` will help you to run the project on your local machine.
- `demo.mp4` demonstrate how to use the project


## Hope you like our project and find it useful.


# Meetup

This web app is a website that allows user to post meetup information. [Check Demo](https://react-1-89e39.web.app)  
It fetch data from a backend project, which is built by Express.  
For more information, check:

- [GitRepo](git@github.com:jinjialij/meetuphere.git)  
- [Check Demo](https://meetuphere.herokuapp.com/meetups)

## Built with

React.js, bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

[Firebase](https://firebase.google.com/?gclid=Cj0KCQiAk4aOBhCTARIsAFWFP9FXRbLORv9aPEsP9xIR3NnbesRo_zeevYe1u_Tjmi-7Jc1eOuKQDx4aAiE9EALw_wcB&gclsrc=aw.ds)

## Getting Started

### Prerequisites

To build and run the application you need:

- [Node >= 14.0.0 and npm >= 5.6](https://nodejs.org/en/)
- install npm-install package

   ```cmd
   npm i npm-install
   ```

### Installing

1. Clone the repository

   ```git
   git clone git@github.com:jinjialij/react-meet-up.git
   ```

2. Change to duck-collector and Install NPM packages

   ```cmd
   cd react-meet-up
   npm install
   ```

## Run application locally

> **Note**  
> This application use Firebase storage to manage image upload  
In `src\firebase\firebase.js`, you need to include your firebaseConfig  

### Run react app

In the project directory, open terminal to run: `npm start`  
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running the tests

`npm test`

### Deployment

Run `npm run build`

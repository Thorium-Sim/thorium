# Thorium Client

[![Slack Status](https://slack.ralexanderson.com/badge.svg)](https://slack.ralexanderson.com)
[![StackShare](https://img.shields.io/badge/teck-stack-blue.svg?style=flat)](https://stackshare.io/alexanderson1993/thorium)

A client webserver for Thorium. Built with [Create React App](https://github.com/facebookincubator/create-react-app), [Apollo-Client](http://www.apollodata.com/) and ❤ by [Alex Anderson](http://ralexanderson.com).

## Getting Started

```sh
npm install
npm run start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.


## Building the App

```
npm run build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Folder Structure

```
.
├── README.md
├── config // Config for building and running Webpack
├── package.json
├── public // Static assets
├── scripts // Scripts run by `npm`
├── src
│   ├── App.js // Starting point for the React app. Loads the data layer.
│   ├── README.md
│   ├── app.scss // Generic css applied site-wide
│   ├── components
│   │   ├── Accounts.jsx // Basic accounts pages
│   │   ├── Client.jsx // First loaded by the client
│   │   ├── README.md
│   │   ├── SimulatorData.jsx // Mostly unused
│   │   ├── StationData.jsx // Mostly unused 
│   │   ├── admin   // Admin pages
│   │   ├── client.scss // CSS for the client
│   │   ├── config  // Config for major application parts
│   │   ├── generic // Generic React components to be re-used
│   │   ├── layouts // Layouts for the client screen
│   │   ├── systems // Configuration components for systems
│   │   └── views   // Cards - Individual screens should go in here
│   ├── containers
│   │   ├── App.js
│   │   ├── Card.jsx
│   │   ├── Config.jsx
│   │   ├── Core.jsx
│   │   ├── Core.scss
│   │   ├── DebugList.jsx
│   │   ├── Lobby.jsx
│   │   ├── MissionModal.jsx
│   │   ├── config.scss
│   │   └── style.scss
│   ├── helpers
│   └── index.js
└── yarn.lock
```

# t9-converter
For the sole submission and review for the [Kiwi.com](https://www.kiwi.com/) practical task.

## Summary
This T9-Conversion project provides a phone-like number pad in the UI that, given an input by the user, will display all the different possible combinations in the T9 format. All combinations displayed are valid entries found in the English dictionary that can be found in `assets/dictionary.txt`.

This project was built using a [React](https://reactjs.org/)-[Redux](https://redux.js.org/) front-end and served on an [Express](https://expressjs.com/) backend that also serves the API for the project. Source files are type-checked using [Flow](https://flow.org/) and linted using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Unit tests are provided and are executed using [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/).

## Getting Started
To view this project for the first time, run the following command:
```
yarn install && yarn start
```
This will install all necessary Node modules and build the project into a `dist/` directory. It will create a JS bundle and CSS file using Webpack for statically serving over an Express backend, which will also start up upon `yarn start`.

Once the server starts up (indicated in the terminal by the logged message `SERVER TURNED ON PORT 3000`), navigate to the following link:
```
http://localhost:3000/
```

### Flags
The API itself is pretty fast and thus results come in quickly to the UI - which is great! But if you want to simulate a delay before receiving a response from the API, I've also added a `--delay` flag to the server script.

Thus, if you want to simulate a delay on the API side, run the following command:
```
yarn start --delay <delayDuration>
```
where `<delayDuration>` is a duration of time specified in milliseconds.

The API and the UI are both being served through port 3000.

## Project Structure
I've structured my project in the following way:
```
assets/
public/
|- dist/
src/
|- actions/
|- api/
|- components/
|- reducers/
|- shared/
|- vendor/
test/
|- actions/
|- api/
|- components/
|- reducers/
```
#### Assets
These are static assets needed that don't need to be exposed publicly on the server.

#### Public
These are the files built and served on the Express server.

#### Src
These are both the front-end and back-end files of the project. This directory is type-checked using Flow and linted using ESLint and Prettier. NodeJS and CommonJS files are built using Babel and Webpack respectively.

#### Test
These are the test files for the project. Tests are run using Jest and Enzyme.

## Testing
To run unit tests, run the following command:
```
yarn test
```


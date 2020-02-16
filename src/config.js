export default {
  API_ENDPOINT:
    process.env.REACT_APP_API_ENDPOINT || 'https://sleepy-fjord-75293.herokuapp.com/api',
  REACT_APP_TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || 'post-up-app-client-token',
  JWT_SECRET: process.env.REACT_APP_JWT_SECRET || 'change-this-secret',
  GOOGLE_MAPS_API_KEY:
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyDOvfuKaaRuYocVQWNl9ICi3wadIephDyc'
};

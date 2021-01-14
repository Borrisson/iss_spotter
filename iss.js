const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    const IP = JSON.parse(body).ip;
    if (!err && IP && response.statusCode === 200) {
      callback(null, IP);
    } else if (err) {
      callback(err);
    } else {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg));
    }
  });
};

const fetchCoordsByIP = function(IP, callback) {
  request(`https://freegeoip.app/json/${IP}`, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const { latitude, longitude } = JSON.parse(body);
      callback(null, { latitude, longitude });
    } else if (err) {
      callback(err);
    } else {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;
  request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const results = JSON.parse(body).response;
      callback(null, results);
    } else if (err) {
      callback(err);
    } else {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover times for IP. Response: ${body}`;
      callback(Error(msg), null);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  callback();
};
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
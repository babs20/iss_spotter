const request = require('request-promise-native');

const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function (body) {
  const data = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${data}`);
};

const fetchISSFlyOverTimes = function (body) {
  const data = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${data.latitude}&lon=${data.longitude}`);
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const passTimes = JSON.parse(body).response;
      return passTimes;
    });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
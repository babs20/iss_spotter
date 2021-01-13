const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (done) {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) {
      done(err, null);
      return;
    }

    if (response.statusCode !== 200) {
      done(Error(`There was status code error in fetchMyIP: ${response.statusCode}`), null);
      return;
    }

    const data = JSON.parse(body);
    done(null, data.ip);
  });
};

const fetchCoordsByIP = (ip, done) => {
  request(`https://freegeoip.app/json/${ip}`, (err, response, body) => {
    if (err) {
      done(err, null);
      return;
    }

    if (response.statusCode !== 200) {
      done(Error(`There was status code error in fetchCoordsByIP: ${response.statusCode}`), null);
      return;
    }

    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;
    done(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (geocoords, done) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${geocoords.latitude}&lon=${geocoords.longitude}`, (err, response, body) => {
    if (err) {
      done(err, null);
      return;
    }

    if (response.statusCode !== 200) {
      done(Error(`There was status code error in fetchISSFlyOverTime: ${response.statusCode}`), null);
      return;
    }

    const times = JSON.parse(body).response;
    done(null, times);
  });
};

const nextISSTimesForMyLocation = (callback) => { // callback hell
  fetchMyIP((err, ip) => {
    if (err) {
      console.log(err);
      return;
    }
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        console.log(err);
        return;
      }
      fetchISSFlyOverTimes(coords, (err, times) => {
        if (err) {
          console.log(err);
          return;
        }
        callback(err, times);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };
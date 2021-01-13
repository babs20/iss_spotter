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
      done(err);
      return;
    }

    if (response.statusCode !== 200) {
      done(Error(`There was status code error: ${response.statusCode}`), null);
      return;
    }

    const data = JSON.parse(body);
    done(err, data.ip);
  });
};

module.exports = { fetchMyIP };
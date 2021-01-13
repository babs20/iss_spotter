const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((err, passTimes) => {
  if (err) {
    return console.log('There was an error', err);
  }

  for (const i in passTimes) {
    // get date and duration
    const obj = passTimes[i];
    const time = new Date(obj.risetime * 1000);
    const date = time.toLocaleString("en-US", { timeZone: 'America/New_York' });
    console.log(`Next pass at ${date} for ${obj.duration} seconds!`);
  }
});

//OLD TESTS

// fetchMyIP((err, body) => {
//   if (err) {
//     console.log('There was an error', err);
//     return;
//   }

//   console.log(body);
// });

// fetchCoordsByIP('71.200.115.151', (err, coords) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log(coords);
// });

// fetchISSFlyOverTimes({ latitude: 38.3523, longitude: -75.5386 }, (err, times) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log(times);
// });
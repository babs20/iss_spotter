const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    for (const i in passTimes) {
      // get date and duration
      const obj = passTimes[i];
      const time = new Date(obj.risetime * 1000);
      const date = time.toLocaleString("en-US", { timeZone: 'America/New_York' });
      console.log(`Next pass at ${date} for ${obj.duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log('Something went wrong (;-;): ', error.message);
  });




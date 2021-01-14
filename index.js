const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  fetchMyIP((err, IP) => {
    if (err) {
      console.log(err);
      return;
    }
    fetchCoordsByIP(IP, (err, coords) => {
      if (err) {
        console.log(err);
        return;
      }
      fetchISSFlyOverTimes(coords, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        let passTimes = '';
        results.forEach(obj => {
          passTimes += `Next pass at ${new Date(obj.risetime * 1000)} for ${obj.duration} seconds!\n`;
        });
        console.log(passTimes);
      });
    });
  });
  // success, print out the deets!

});
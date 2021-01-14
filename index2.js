const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(array) {
  array.forEach(time => {
    console.log(time);
  });
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

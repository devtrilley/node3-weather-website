const request = require("request");

// Added unit param to function
const forecast = (latitude, longitude, unit = "m", callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3dd8b7767ebe4d2f554592363af8157f&query=${latitude},${longitude}&units=${unit}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      console.log(error); // Showing that my monthly limit has been reached
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      console.log(body.error); // Showing that my monthly limit has been reached
      callback("Unable to find location, try again", undefined);
    } else {
      // Initialized our dynamic data in vars to clean up code
      const weatherDescriptions = body.current.weather_descriptions[0];
      const temperature = body.current.temperature;
      const humidity = body.current.humidity;

      callback(
        undefined,
        // String says "{forecast}. It is currently {temp}°{metric} with a humidity of {humidity}%."
        `${weatherDescriptions}. It is currently ${temperature}°${
          unit === "m" ? "C" : unit === "f" ? "F" : "K"
        } with a humidity of ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;

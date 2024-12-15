const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    address
  )}&access_token=pk.eyJ1IjoiZGV2dHJpbGxleSIsImEiOiJjbTRqMHM2ZGgwODZwMm1xM2xrbnA0bXRqIn0.0xAmJ2lUrmP8Juw0SDAMug&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].properties.coordinates.latitude,
        longitude: body.features[0].properties.coordinates.longitude,
        location: body.features[0].properties["full_address"],
      });
    }
  });
};

module.exports = geocode;

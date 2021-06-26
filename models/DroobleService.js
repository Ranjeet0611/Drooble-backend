const SpotifyWebApi = require('spotify-web-api-node');
const DroobleUser = require('./DroobleUser');

module.exports = class DroobleService {
  static updateUserLocation(lat, long, userId) {
    const updateLocation = new Promise((resolve, reject) => {
      DroobleUser.findOneAndUpdate(
        { _id: userId },
        { $set: { location: { type: 'Point', coordinates: [lat, long] } } }
      )
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(
            new Error(
              'Please allow drooble to access your location for better experience'
            )
          );
        });
    });
    return updateLocation;
  }
  static getNearbyUsers(lat, long, userId) {
    const getUsers = new Promise((resolve, reject) => {
      DroobleUser.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [lat,long],
            },
            $minDistance: 0,
            $maxDistance: 1000000,
          },
        },
      }).find((error, results) => {
        if (error) {
          reject(new Error('Unable to fetch neaby users'));
        }
        resolve(results);
      });
    });
    return getUsers;
  }
};

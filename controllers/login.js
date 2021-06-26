const DroobleService = require('../models/DroobleService');

exports.getLocation = (req, res, next) => {
  const lat = req.body.latitude;
  const long = req.body.longitude;
  userId = req.userId;
  console.log(lat + ' ' + long + ' ' + userId);
  DroobleService.updateUserLocation(lat, long, userId)
    .then((result) => {
      DroobleService.getNearbyUsers(lat, long, userId)
        .then((result) => {
          const data = result.filter(
            (item) => item._id.toString() !== userId.toString()
          );
          console.log(data);
          res
            .status(200)
            .json({ user: data, message: 'Users fetched successfully' });
        })
        .catch((err) => {
          res.status(404).json({ message: err.message });
        });
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: 'Please allow drooble to access you location' });
    });
};

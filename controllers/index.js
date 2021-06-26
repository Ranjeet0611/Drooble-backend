const SpotifyWebApi = require('spotify-web-api-node');
const DroobleUser = require('../models/DroobleUser');
const DroobleLogin = require('../models/DroobleLogin');
const jwt = require('jsonwebtoken');
const Drooble = require('../models/Drooble');
var spotifyApi = new SpotifyWebApi({
  clientId: 'dc8cee432bcf412fb5eb626b56c0e77f',
  clientSecret: '1dd3df252a7442b98535e78a50a278b8',
  redirectUri: 'https://drooble-backend.herokuapp.com/auth/callback',
});
let access_token = '';

exports.getLogin = (req, res, next) => {
  const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify',
  ];
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
};
exports.getCallback = (req, res, next) => {
  const err = req.query.error;
  const code = req.query.code;
  const state = req.query.state;
  if (err) {
    res.send('Callback error');
    return;
  }
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      access_token = data.body['access_token'];
      // console.log(access_token);
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];
      spotifyApi.setAccessToken(access_token);
      // spotifyApi.setRefreshToken(refresh_token);
      // setInterval(async () => {
      //   const data = await spotifyApi.refreshAccessToken();
      //   access_token = data.body['access_token'];

      //   console.log('The access token has been refreshed!');
      //   console.log('access_token:', access_token);
      //   spotifyApi.setAccessToken(access_token);
      // }, (expires_in / 2) * 1000);

      spotifyApi.getMe().then((userData) => {
        DroobleUser.findOne({ email: userData.body.email })
          .then((user) => {
            if (user) {
              DroobleLogin.updateUserTopTracks(spotifyApi, user)
                .then((result) => {
                  const token = jwt.sign(
                    {
                      email: userData.body.email,
                      userId: user._id.toString(),
                      spotifyId: user.spotifyId,
                      spotifyUri: user.spotifyUri,
                      access_token: access_token,
                    },
                    'drooble@ranjeetSingh@brooble',
                    { expiresIn: '1h' }
                  );
                  res.cookie('token', token);
                  res.cookie('isAuthenticated', true);
                  res.redirect('https://drooble.herokuapp.com/dashboard');
                })
                .catch((err) => {
                  res.redirect('https://drooble.herokuapp.com/');
                });
            } else {
              DroobleLogin.saveSpotifyUser(spotifyApi, userData)
                .then((user) => {
                  const token = jwt.sign(
                    {
                      email: userData.body.email,
                      userId: user._id.toString(),
                      spotifyId: user.spotifyId,
                      spotifyUri: user.spotifyUri,
                      access_token: access_token,
                    },
                    'drooble@ranjeetSingh@brooble',
                    { expiresIn: '1h' }
                  );
                  res.cookie('token', token);
                  res.redirect('https://drooble.herokuapp.com/dashboard');
                })
                .catch((err) => {
                  res.redirect('https://drooble.herokuapp.com/');
                });
            }
          })
          .catch((err) => {
            res.redirect('https://drooble.herokuapp.com/');
          });
      });
    })
    .catch((error) => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
};
exports.spotifyApi = spotifyApi;

const indexController = require('../controllers/index');
module.exports = class DroobleArtist {
  static getArtistProfile(artistId, access_token) {
    const getArtistProfile = new Promise((resolve, reject) => {
      indexController.spotifyApi.setAccessToken(access_token);
      indexController.spotifyApi
        .getArtist(artistId)
        .then((res) => {
          resolve(res.body);
        })
        .catch((err) => {
          reject(new Error('Not able to fetch artist profile'));
        });
    });
    return getArtistProfile;
  }
  static getArtistTopSongs(artistId, access_token) {
    const getArtistTopSongs = new Promise((resolve, reject) => {
        indexController.spotifyApi.setAccessToken(access_token);
        indexController.spotifyApi.getArtistTopTracks(artistId,'IN')
        .then(tracks => {
            resolve(tracks.body);
        })
        .catch(err=>{
            reject(new Error('Not able to fetch artist top tracks'));
        });
    });
    return getArtistTopSongs;
  }
  static getArtistAlbum(artistId,access_token){
      const getArtistAlbum = new Promise((resolve, reject) =>{
          indexController.spotifyApi.setAccessToken(access_token);
          indexController.spotifyApi.getArtistAlbums(artistId,{limit:6,offset:5})
          .then(albums=>{
              resolve(albums.body);
          })
          .catch(err=>{
              reject(new Error('Not able to fetch artist album'));
          })
      });
      return getArtistAlbum;
  }
  static getRelatedArtists(artistId, access_token){
      const getRelatedArtists = new Promise((resolve, reject)=>{
          indexController.spotifyApi.setAccessToken(access_token);
          indexController.spotifyApi.getArtistRelatedArtists(artistId)
          .then(RelatedArtists=>{
              resolve(RelatedArtists.body);
          })
          .catch(err=>{
              reject(new Error('Not able to fetch related artist'));
          })
      })
      return getRelatedArtists;
  }
};

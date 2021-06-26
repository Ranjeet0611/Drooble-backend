const indexController = require('../controllers/index');
const DroobleUser = require('../models/DroobleUser');
module.exports = class Drooble {
  static getUserPlaylists(userId, spotifyId, access_token) {
    const addSongToPlayList = new Promise((resolve, reject) => {
      indexController.spotifyApi.setAccessToken(access_token);
      indexController.spotifyApi
        .getUserPlaylists(spotifyId)
        .then((data) => {
          if (data.body.items.length === 0) {
            resolve(data.body.items);
          }

          resolve(data.body.items);
        })
        .catch((err) => {
          reject(new Error('No PlayList Found'));
        });
    });
    return addSongToPlayList;
  }
  static getNewReleasesSongs(access_token) {
    const getNewReleases = new Promise((resolve, reject) => {
      indexController.spotifyApi.setAccessToken(access_token);
      indexController.spotifyApi
        .getNewReleases({ limit: 10, offset: 0, country: 'IN' })
        .then((result) => {
          console.log(result.body);
          resolve(result.body.albums.items);
        })
        .catch((err) => {
          reject(new Error('Not able to fetch new songs'));
        });
    });
    return getNewReleases;
  }
  static getUserTopArtists(access_token) {
    const getTopArtists = new Promise((resolve, reject) => {
      indexController.spotifyApi.setAccessToken(access_token);
      indexController.spotifyApi.getMyTopArtists({time_range:"long_term"})
        .then((result) => {
          resolve(result.body.items);
        })
        .catch((err) => {
          reject(new Error('No TopArtists Found'));
        });
    });
    return getTopArtists;
  }
  static getUserProfile(id){
    const getUser = new Promise((resolve, reject) => {
      DroobleUser.findById({_id:id})
      .then((user) =>{
        console.log(user);
        resolve(user);
      })
      .catch(err=>{
        reject(new Error('No User found.'));
      })
    });
    return getUser;
  }
  static getUserById(id){
    const getUserById = new Promise((resolve, reject) =>{
      DroobleUser.findById({_id:id})
      .then(user=>{
        resolve(user);
      })
      .catch(err=>{
        reject(new Error('No User found.'));
      })
    })
    return getUserById;
  }
  static getDroobleUsers(userId){
    const getDroobleUsers = new Promise((resolve, reject)=>{
      DroobleUser.find({_id:{$ne:userId}}).select([
        "spotifyId",
        "spotifyUri",
        "name",
        "imageUrl",
        "country"
      ])
      .then(result=>{
        resolve(result);
      })
      .catch(err=>{
        reject(new Error('No Users Found'));
      })
    })
    return getDroobleUsers;
  }
  static getFeaturedPlaylists(access_token){
    const getFeaturedPlaylists = new Promise((resolve, reject) => {
      indexController.spotifyApi.setAccessToken(access_token);
      indexController.spotifyApi.getFeaturedPlaylists({country:'IN'})
      .then(result=>{
        resolve(result.body.playlists.items)
      })
      .catch(err=>{
        reject(new Error('Not able to fetch'));
      })
    })
    return getFeaturedPlaylists;
  }
};

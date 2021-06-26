const indexController = require('../controllers/index');
const DroobleUser = require('./DroobleUser');

module.exports = class DroobleAlbum{
    static saveAlbum(albumId,access_token){
        const saveAlbum = new Promise((resolve, reject) => {
            indexController.spotifyApi.setAccessToken(access_token);
            var saved = true;
            indexController.spotifyApi.containsMySavedAlbums([albumId])
            .then(result=>{
                var isExists = result.body[0];
                if(!isExists){
                    indexController.spotifyApi.addToMySavedAlbums([albumId])
                    .then(result=>{
                        resolve(saved);
                    })
                    .catch(err=>{
                        reject(new Error('Not Saved'));
                    })
                }
                else{
                    resolve(saved);
                }
            })
            .catch(err=>{
                reject(new Error('Not Saved'));
            })
        })
        return saveAlbum;
    }
    static removeAlbum(albumId,access_token){
        const removeAlbum = new Promise((resolve,reject)=>{
            indexController.spotifyApi.setAccessToken(access_token);
            var isRemoved = true;
            indexController.spotifyApi.containsMySavedAlbums([albumId])
            .then(result=>{
                var isExists =result.body[0];
                if(isExists){
                    indexController.spotifyApi.removeFromMySavedAlbums([albumId])
                    .then(result=>{
                        resolve(isRemoved);
                    })
                    .catch(err=>{
                        reject(new Error('Not able to remove album'));
                    })
                }
                else{
                    isRemoved = false;
                    resolve(isRemoved);
                }
            })
            .catch(err=>{
                reject(new Error('Not able to remove album'));
            })
        })
        return removeAlbum;
    }
    static getUserSavedAlbum(access_token){
        const getUserSavedAlbum = new Promise((resolve, reject) =>{
            indexController.spotifyApi.setAccessToken(access_token);
            indexController.spotifyApi.getMySavedAlbums()
            .then(result=>{
                resolve(result.body.items);
            })
            .catch(err=>{
                reject(new Error('Not Able to fetch album'));
            })
        })
        return getUserSavedAlbum;
    }
}
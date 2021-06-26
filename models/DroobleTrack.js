const indexController = require('../controllers/index');
const DroobleUser = require('./DroobleUser');

module.exports = class DroobleTrack{
    static saveTrack(trackId,access_token){
        const saveTrack = new Promise((resolve, reject)=>{
            indexController.spotifyApi.setAccessToken(access_token);
            indexController.spotifyApi.containsMySavedTracks([trackId])
            .then(result=>{
                var isExists = result.body[0];
                if(!isExists){
                    indexController.spotifyApi.addToMySavedTracks([trackId])
                    .then(result=>{
                        var saved = true;
                        resolve(saved)
                    })
                    .catch(err=>{
                        reject(new Error('Not Saved'))
                    })
                }
                else{
                    var alreadySaved = true;
                    resolve(alreadySaved);
                }
            })
            .catch(err=>{
                reject(new Error('Not Saved'));
            })
        })
        return saveTrack;
    }
    static removeTrack(trackId,access_token){
        const removeTrack = new Promise((resolve,reject)=>{
            indexController.spotifyApi.setAccessToken(access_token);
            var isRemoved = true;
            indexController.spotifyApi.containsMySavedTracks([trackId])
            .then(result=>{
                var isExists =result.body[0];
                if(isExists){
                    indexController.spotifyApi.removeFromMySavedTracks([trackId])
                    .then(result=>{
                        resolve(isRemoved);
                    })
                    .catch(err=>{
                        reject(new Error('Not able to delete track'));
                    })
                }
                else{
                    isRemoved = false;
                    resolve(isRemoved);
                }
            })
            .catch(err=>{
                reject(new Error('Not able to delete track'));
            })
        })
        return removeTrack;
    }
}
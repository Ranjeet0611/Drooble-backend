const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,'drooble@ranjeetSingh@brooble');
    }
    catch(err){
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error
    }
    if(!decodedToken){
        const error = new Error('Not Authenticated');
        error.statusCode = 401;
        throw error
    }
    console.log(decodedToken.access_token);
    req.userId = decodedToken.userId;
    req.spotifyId = decodedToken.spotifyId;
    req.access_token = decodedToken.access_token;
    next();
}
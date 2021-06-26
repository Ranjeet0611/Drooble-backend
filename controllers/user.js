const express = require('express');
const Drooble = require('../models/Drooble');
const DroobleService = require('../models/DroobleService');

exports.getUsers = (req, res, next) => {
    const lat = req.body.latitude;
    const long = req.body.longitude;
    userId = req.userId;
    console.log(userId);
    DroobleService.getNearbyUsers(lat, long,userId)
    .then(result=>{
        const data = result.filter(item=>item._id.toString()!==userId.toString());
        console.log(data);
        res.status(200).json({user:data,message:"Users fetched successfully"});
    })
    .catch(err=>{
        res
        .status(404)
        .json({ message: err.message });
    });
};
exports.getUserPlaylist = (req, res, next) => {
    const userId = req.userId;
    const spotifyId = req.spotifyId;
    const access_token = req.access_token;
    console.log(userId);
    console.log('Access Token '+req.access_token);
    Drooble.getUserPlaylists(userId,spotifyId,access_token)
    .then(result=>{
        console.log('Result '+result);
        res.status(200).json({playlists:result,message:'Playlist fetched Successfully'});
    })
    .catch(err=>{
      res.status(404).json({playlists:[],message})
    })
}
exports.getNewReleases = (req,res,next) =>{
    const access_token = req.access_token;
    Drooble.getNewReleasesSongs(access_token)
    .then(result=>{
        res.status(200).send({Songs:{result},message:'Songs fetched successfully'});
    })
    .catch(err=>{
        res.status(400).json({message:err.message});
    })
}
exports.getUserProfile = (req, res,next) => {
    const userId = req.userId;
    Drooble.getUserProfile(userId)
    .then(result =>{
        res.status(200).json({Profile:result,message:'Profile Fetched Successfully'});
    })
    .catch(err=>{
        res.status(404).json({message:'No User Found'});
    })
}
exports.getUserById = (req,res,next) =>{
    const userId = req.params.userId;
    Drooble.getUserById(userId)
    .then(result=>{
        res.status(200).json({Profile:result,message:result,message:'Successfully fetched'})
    })
    .catch(err=>{
        res.status(404).json({message:err.message});
    })
}
exports.getDroobleUsers = (req, res,next) => {
    const userId = req.params.userId;
    Drooble.getDroobleUsers(userId)
    .then(result=>{
        res.status(200).json({Users:result,message:result,message:'Successfully fetched'})
    })
    .catch(err=>{
        res.status(404).json({message:err.message});
    })
}
exports.getTopArtists= (req,res,next) =>{
    const access_token = req.access_token;
    Drooble.getUserTopArtists(access_token)
    .then(result=>{
        res.status(200).json({TopArtists:result,message:'Top Artists Fetched Successfully'});
    })
    .catch(err=>{
        res.status(404).json({message:err.message});
    })
}
exports.getFeaturedPlaylists = (req, res,next) => {
    const access_token = req.access_token;
    Drooble.getFeaturedPlaylists(access_token)
    .then(result => {
        res.status(200).json({FeaturedPlaylists:result,message:'Successfully fetched'})
    })
    .catch(err=>{
        res.status(404).json({message:err.message});
    })
}
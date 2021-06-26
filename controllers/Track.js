const express = require('express');
const Drooble = require('../models/Drooble');
const DroobleTrack = require('../models/DroobleTrack');

exports.saveToMyTrack = (req, res, next) => {
    const trackId = req.params.trackId;
    const access_token = req.access_token;
    DroobleTrack.saveTrack(trackId, access_token)
    .then((result) =>{
        res.status(200).json({isDone:result,message:'Successfully Saved'});
    })
    .catch(err=>{
        res.status(400).json({isDone:false,message:err.message});
    })
}
exports.removeTrackFromLibrary = (req, res,next) =>{
    const trackId = req.params.trackId;
    const access_token = req.access_token;
    DroobleTrack.removeTrack(trackId, access_token)
    .then(result=>{
        res.status(200).json({isDone:result,message:'Successfully Removed'});
    })
    .catch(err=>{
        res.status(404).json({isDone:false,message:err.message});
    })
}
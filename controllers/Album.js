const express = require('express');
const Drooble = require('../models/Drooble');
const DroobleAlbum = require('../models/DroobleAlbum');
exports.saveAlbumToLibrary = (req, res, next) => {
  const albumId = req.params.albumId;
  const access_token = req.access_token;
  DroobleAlbum.saveAlbum(albumId, access_token)
    .then((result) => {
      res.status(200).json({ isDone: result, message: 'Successfully Saved' });
    })
    .catch((err) => {
      res.status(404).json({ isDone: false, message: err.message });
    });
};
exports.removeAlbumFromLibrary = (req, res, next) => {
  const albumId = req.params.albumId;
  const access_token = req.access_token;
  DroobleAlbum.removeAlbum(albumId, access_token)
    .then((result) => {
      res.status(200).json({ isDone: result, message: 'Successfully Saved' });
    })
    .catch((err) => {
      res.status(404).json({ isDone: false, message: err.message });
    });
};
exports.getUserSavedAlbum = (req,res,next)=>{
  const access_token = req.access_token;
  DroobleAlbum.getUserSavedAlbum(access_token)
  .then(result=>{
    res.status(200).json({ SavedAlbum:result, message:'Successfully fetched'})
  })
  .catch(err=>{
    res.status(404).json({message:'Failed to fetch'});
  })
}


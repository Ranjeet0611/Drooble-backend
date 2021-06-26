const express = require('express');
const Drooble = require('../models/Drooble');
const DroobleArtist = require('../models/DroobleArtist');

exports.getArtistProfile = (req,res,next) => {
    const userId = req.userId;
    const access_token = req.access_token;
    const artistId = req.params.artistId;
    DroobleArtist.getArtistProfile(artistId, access_token)
    .then(result=>{
        res.status(200).json({artistProfile: result,message:'Successfully fetched'})
    })
    .catch(err =>{
        res.status(404).json({message:'Not able to fetch artist profile'});
    })
}
exports.getArtistTopTracks = (req,res,next) =>{
    const artistId = req.params.artistId;
    const access_token = req.access_token;
    DroobleArtist.getArtistTopSongs(artistId, access_token)
    .then(result =>{
        res.status(200).json({TopTracks:result,message:'Successfully fetched'});
    })
    .catch(err =>{
        res.status(404).json({message:err.message});
    })
}
exports.getArtistAlbum = (req,res,next)=>{
  const artistId  = req.params.artistId;
  const access_token = req.access_token;
  DroobleArtist.getArtistAlbum(artistId, access_token)
  .then(result=>{
      res.status(200).json({ArtistAlbum:result,message:'Successfully fetched'});
  })
  .catch(err=>{
      res.status(404).json({message:err.message});
  })
}
exports.getRelatedArtists = (req,res,next) =>{
    const artistId = req.params.artistId;
    const access_token = req.access_token;
    DroobleArtist.getRelatedArtists(artistId,access_token)
    .then(result =>{
        res.status(200).json({RelatedArtists:result,message:'Successfully fetched'});
    })
    .catch(err=>{
        res.status(404).json({message:err.messgae});
    })
}
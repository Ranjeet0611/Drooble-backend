const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    spotifyId:{
        type:String,
        required:true
    },
    spotifyUri:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required: true,
    },
    imageUrl:{
        type:String,
        required: true
    },
    isPremium:{
        type:String,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    location:{
        type: { type: String },
        coordinates: []
    },
    topTracks:[]
},{timestamps:true});
userSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('DroobleUser',userSchema);
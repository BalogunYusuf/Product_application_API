const cloudinary = require('cloudinary').v2;

//import {v2 as cloudinary} from "cloudinary" mjs format

cloudinary.config({
    cloud_name : "doopzrzep",
    api_key : "643554471177346",
    api_secret : "cNT0uQrQefNT-SkU8T_8HSLY-Ow"
})

module.exports = cloudinary;
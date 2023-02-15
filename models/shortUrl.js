const mongoose = require('mongoose')

const shortUrlSchema = new mongoose.Schema({

    fullUrl:{
        type:String,
        required:true,
        
    },
    shortUrl:{
        type:String,
        required:true,

    },
    count:{
        type:number,
    }


})

module.exports = mongoose.model('shortUrl',shortUrlSchema)
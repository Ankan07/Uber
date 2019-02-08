const {mongoose}=require('../db/mongoose.js');
const {geopointSchema}=require('../models/geopointschema');
const locationlogs=mongoose.Schema({
    point:{
        type:{geopointSchema}
    },
    timestamp:{
        type:Number,default:Date.now
    }
})
module.exports={locationlogs};
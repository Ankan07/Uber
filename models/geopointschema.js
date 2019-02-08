const {mongoose}=require('../db/mongoose.js');
const geopointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });
  module.exports={geopointSchema}
 
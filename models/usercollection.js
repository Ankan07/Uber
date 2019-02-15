
var {mongoose}=require('../db/mongoose.js');
var {geopointSchema}=require('../models/geopointschema');
var {locationlogs}=require('../models/locationlogs');

//Schema.Types.ObjectId
var Journey= new mongoose.Schema({
  "type":String,
    start:{
    type:geopointSchema
    },
    end:{
      type:geopointSchema
      },
    
    start_time: { 
      type : Number, default: Date.now
        },
    end_time:{
      type: Number,default:Date.now
       }
    ,
    location_logs:[locationlogs]
});

var Usercollection=new mongoose.Schema({
  // uids:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   auto:true
  // },
  name:String,
  email:{
    type:String
  },
  
  Journeys:[Journey]
})

//var Journeymodel=mongoose.model('Journey',Journeymodel);
 var Usercollection=mongoose.model('Usercollection',Usercollection);
 module.exports={Usercollection,Journey};
 

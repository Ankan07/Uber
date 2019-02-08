
var {Usercollection}=require('./models/usercollection');
//var {Journeymodel}=require('./models/Journeymodel');

var {mongoose}=require('./db/mongoose');
const port=process.env.PORT || 1000;
var express=require('express');
var app=express();
var bodyparser=require('body-parser');
app.use(bodyparser.json());
app.post('/v1/create_user',(req,res)=>{
 
    var user=new Usercollection({
       name:req.body.name,
       email:req.body.email
    })
    user.save().then((doc)=>{
       
        res.status(200).send(doc);

    }).catch((e)=>{
        res.status(500).send(e);
    })
})
app.post('/v1/create_journey',(req,res)=>{
    
    Usercollection.findById(req.body.uid).then((doc)=>{
     doc.Journeys.push({start:req.body.start,end:req.body.end});
     doc.save().then((d)=>{
        res.status(200).send(d);
     }).catch((e)=>{
        res.status(500).send(e);
    })
   
    });


})
app.post('/v1/update_journey',(req,res)=>{
    
    Usercollection.findById(req.body.uid).then((doc)=>{
        var subdoc= doc.Journeys.id(req.body.jid);
        subdoc.start_time=req.body.start_time;
        subdoc.end_time=req.body.end_time;
  
     doc.save().then((doce)=>{
          res.status(200).send(doce);
      }).catch((err)=>{
           res.status(500).send(err);
      })

    
    
    }).catch((e)=>{
        res.status(500).send(e);
    });


})
app.post('/v1/addlocation_log',(req,res)=>{
    
    Usercollection.findById(req.body.uid).then((doc)=>{
        var subdoc= doc.Journeys.id(req.body.jid);
        subdoc.location_logs.push({point:req.body.point,timestamp:req.body.timestamp});
        
  
     doc.save().then((doce)=>{
          res.status(200).send(doce);
      }).catch((err)=>{
           res.status(500).send(err);
      })

    
    
    }).catch((e)=>{
        res.status(500).send(e);
    });


})
app.post('/v1/get_journey_list',(req,res)=>{
  Usercollection.findById(req.body.uid).then((doc)=>{
     var array=[]
     doc.Journeys.forEach(element => {
         array.push({
            id:element._id,
            start:element.start,
            end:element.end,
            start_time:element.start_time,
            end_time:element.end_time

         })
         
     });
     if(doc.Journeys.length===array.length)
      res.send(array);

  }).catch((e)=>{
      res.status(500).send(e);
  })  
})
app.post('/v1/get_journey_details',(req,res)=>{
    Usercollection.findById(req.body.uid).then((doc)=>{
        var subdoc=doc.Journeys.id(req.body.jid);
        res.send(subdoc);
    })
})
app.get('/v1/all',(req,res)=>{
    Usercollection.find({},function(err,users){
        if(users)
        res.status(200).send(users);
        else
        res.status(500).send(err);
    })
})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})

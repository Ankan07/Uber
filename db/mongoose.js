var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/Users',{ useNewUrlParser: true });
mongoose.Promise=global.Promise;
module.exports={mongoose};
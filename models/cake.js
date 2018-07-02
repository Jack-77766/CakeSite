var mongoose = require('mongoose');

//DATABASE SETUP
var cakeSchema = new mongoose.Schema({
   name: String,
   image: String,
   category: {
       type: String,
       enum: ['birthday-cakes', 'fancy-cakes', 'cupcakes']
   },
   description: String,
   recipe: String,
   user: {
            id:{
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User'
            },
            username: String
   },
   comments: [
       {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
       }
   ],
   date:  {type: Date, default: Date.now()}
    
});

module.exports = mongoose.model('Cake', cakeSchema);
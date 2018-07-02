var mongoose = require('mongoose'),
    Cake     = require('./models/cake'),
    Comment  = require('./models/comment'),
    User     = require('./models/user');

var data = [
                {
                    name: 'Star Sponge Cake',
                    image:'https://images.unsplash.com/photo-1464347744102-11db6282f854?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1ddae735d7eb8c88b1c07f8b919140bf&auto=format&fit=crop&w=1487&q=80',
                    category: 'birthday-cakes',
                    description: "Colored sponge cake with vanilla buttercream small star sprinkles and big chocolate stars",
                    recipe: "1 Sponge cake \n Vanilla buttercream \n Star sprinkles \n Big colored stars"
                    
                },
                {
                    name: 'Chocolate Birthday Cake',
                    image:'https://images.unsplash.com/photo-1507066274042-8a683a1e6ffe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7c165bb7b6ea6d38be38b6998a2fbba9&auto=format&fit=crop&w=750&q=80',
                    category: 'birthday-cakes',
                    description: "Chocolate Fudge Birthday Cake with chocolate dots and candles",
                    recipe: "1 Chocolate Cake \n 1 bowl Chocolate Fudge \n 1/2 cup chocolate dots"   
                },
                {
                    name: 'Fruit Cake',
                    image:'https://images.unsplash.com/photo-1508736375612-66c03035c629?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d5fe655f86ab0c3b2e2450e4ec5895c3&auto=format&fit=crop&w=1353&q=80',
                    category: 'fancy-cakes',
                    description: "Sponge Cake with Vanilla Frosting and Fruit Toppings",
                    recipe: "1 Sponge Cake \n 1 bowl Vanilla Frosting \n 1/2 cup kiwis \n 1/2 cup strawberries \n 1/2 cup raspberries" 
                },
                {
                    name: 'Flower Frosting Cupcakes',
                    image:'https://images.unsplash.com/photo-1521309918586-feb7aa79a61b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cab7cd95dae7fbccba615fac4d0219f8&auto=format&fit=crop&w=1534&q=80',
                    category: 'cupcakes',
                    description: "Cupcakes with beautifull flower frosting decoration",
                    recipe: "1 batch of cupcakes \n 1 bowl Vanilla Frosting \n 2-3 food colorings" 
                },
                {
                    name: 'Summer Berry Pavlova Cake ',
                    image:'https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cb78fe07e9349cc5ae1502bd1741d1cf&auto=format&fit=crop&w=334&q=80',
                    category: 'fancy-cakes',
                    description: "Delicious Pavlova with Strawberries, Raspberries and Pistachios",
                    recipe: "1 Pavlova \n 1 cup Strawberries \n 1 cup Raspberries \n 1/2 cup Pistachios"
                    
                },
                {
                    name: 'Pumpkin Granadine Cupcakes',
                    image:'https://images.unsplash.com/photo-1511689272509-1601231ad779?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=02ee92b04428e2ac82be918af8b70243&auto=format&fit=crop&w=334&q=80',
                    category: 'cupcakes',
                    description: "Pumpkin cupcakes with vanilla frosting and granadine filling",
                    recipe: "1 Pumpkin Cake \n 1 bowl Vanilla Frosting \n 2 cups Granadine Filling"
                    
                }
    ];
    
function seedDB() {
    Cake.remove({}, function(err){
        if(err){
            console.log(err)
        }
        else {
            console.log("All cakes removed")
            Comment.remove({}, function(err){
                if(err){
                    console.log(err)
                }
                else {
                    console.log("All comments removed")
                    data.forEach(function(cake){
                       Cake.create(cake, function(err, createdCake) {
                           if(err) {
                               console.log(err)
                           }
                           else{
                               console.log('Cake Created')
                               var newUser = {
                                   username: 'Aunt Jemima',
                                   password: 'yolo'
                               };
                               User.create(newUser, function(err,createdUser){
                                   if(err)
                                    console.log(err);
                                    else {
                                   Comment.create({
                                           author: {
                                               id: createdUser._id,
                                               username: createdUser.username
                                           },
                                           text:   'That is really delicious!!!'
                                       }, function(err, newComment) {
                                           if(err) {
                                               console.log(err);
                                           }
                                           else {
                                               createdCake.comments.push(newComment);
                                               createdCake.save();
                                               console.log('Comment Added');
                                           }
                                    })}
                               });
                               
                               
                           }
                       }) 
                    })
                }
            });        
        }
    });
}

module.exports = seedDB;
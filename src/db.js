require("babel-polyfill");
var co = require("co");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lumi');
var db = mongoose.connection;
db.on('error',function (err){
  console.log(err);
})

db.on('disconnected', function (){
  console.log('Datebase disconnected!!');
})

var Users = require('./models/users');
var Sessions = require('./models/sessions');
var Messages = require('./models/messages');

// clear the database
// Users.removeAll(function(err, docs) {
//   console.log(docs);
// })


// Sessions.updateSession('rsheng@lakeheadu.ca',new Date(),new Date(new Date().getTime()+ 2 * 7 * 24 * 60 * 60 * 1000), function (err,session){
//   if(err){
//     console.log(err);
//   }
//   console.log(session);
// });


// Users.update({_id:"56f2f400b6e073d43245d6fb"},{friends:[]},function(err,docs){
//   if(err){
//     console.log(err);
//   }
//   console.log(docs);
// })


// Users.findAll(function (err,user){
//   console.log(user);
// });


// Users.findById('572281817d75053030dff678').populate('recent', "username")
//   .exec(function(err, docs){
//     console.log(docs.recent)
//   })

// Users.findByIdAndUpdate('572281817d75053030dff678',
//   {$pull: {recent: '572794305b7c515807c3452d'}}).exec();

// Users.findById('572281817d75053030dff678')
//   .populate({
//     path: 'recent',
//     match: {_id: '5727944838d4ff801774bdc5'}
//   })
//   .exec(function(err, docs){
//     console.log(docs);
//   })


// push a recent friend
// Users.findByIdAndUpdate('572281817d75053030dff678', 
//         {$push:{'recent': {_id: '5727944838d4ff801774bdc5'}}}).exec();

// Users.update({username: 'rsheng1@lakeheadu.ca'}, 
//   {$set: {recent: []}}, 
//   function(err, res){
//     console.log(res)
//   })

function promisefyUpdate(Model, arg1, arg2, options) {
  return new Promise(function(res, rej) {
     Model.update(arg1, arg2, options, function(err, result){
        if (err) return rej(err);
        res(result);
     })
  });
};

var arrayUser = [
'572281817d75053030dff678',
// '572281817d75053030dff679',
'572794119432dab42f451190',
'572794305b7c515807c3452d',
'572794407b9e0cd4185948d3',
'5727944838d4ff801774bdc5', 
];

var run = co.wrap(function* (){
  try {
    var ii = yield promisefyUpdate(Users, {username:'rsheng2@lakeheadu.ca'},
                 {$push:{friends:  { $each: arrayUser }}},
                 {});

    console.log(ii);
    }catch(e){
      console.log(e);
    }

})

// run();


//create a user
// var user = new Users({username: 'rsheng@lakeheadu.ca', password: '123456', activated: true, activate_token: ''});
// user.save(function (err, user) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(user);
// });


// var array = [];
// for (var i = 1; i < 21; i++) {
//   array.push({username: 'rsheng'+i+'@lakeheadu.ca', password: '123456', activated: true, activate_token: ''})
// };

// var creatUsers = co.wrap(function* (){
//   try{
//     for (var i = 0; i < array.length; i++) {
//       var user = yield Users.create(array[i]);
//       console.log(user);
//     };
//   }catch(e){
//     console.log(e);
//   }
    
// })



//login user create session
// var session = new Sessions({session_token:"sdfsdfsdfsdfsdfsdfsfd",user: "56f2f400b6e073d43245d6fb"});
// session.save(function (err, session) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(session);
// });

//create a message
// var message = new Messages({from: "570fc847d9449b842c7d6319", to: '570fc8290fdec5502fe3e4c0', message: "hello, rsheng",});
// message.save((err, doc) =>{
//   err && console.log(err);
//   console.log(doc);
// });
// Messages.find({from: "570fc8290fdec5502fe3e4c0"}, function (err,mes){
//   console.log(mes[0]);
// }).populate("from");

//descending sort created_at, 
// Messages.find({$or: [{from :"570fc8290fdec5502fe3e4c0", to: '570fc847d9449b842c7d6319'},
//                      {from :"570fc847d9449b842c7d6319", to: '570fc8290fdec5502fe3e4c0'}]}, (err,mes)=>{
//                         err && console.log(err);
//                         console.log(mes);
//                      }).sort('created_at').populate("from").populate("to");


// Users.findOne({_id: "56f2f400b6e073d43245d6fb"}).populate('friends', 'username password').exec().then((user)=> console.log(user.friends));

// Sessions.findOne({_id: '570fc953cbdc94b8264424e7'},function(err,docs){
//   err && console.log(err);
//   console.log(docs)
// }).populate("user", "username avatar");


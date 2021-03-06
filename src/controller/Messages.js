var Messages = require('../models/messages');
var Users = require('../models/users');
var gcm = require('node-gcm');
var Ctrl = require('../Controller');
var ifExists = require("../utilities/ifExists");
var Gcms = require('../models/googleCloudMessaging');

module.exports = Ctrl.createController({

  findSession: ['sendMessages', 'storeMessages', 'getEarlierMessages'],

  register: async function(req, res, next){
    // console.log("----------------",req.body);
    var {
        token,
        userid,
      } = req.body;

      try{
        var gcmUser = await ifExists.gcmUser(userid);

        if(!gcmUser){
          //no token and no users, create a new one
          var gcm = await Gcms.create({user: userid, tokens: [token]});
          res.send({message: 'registed gcm'})
        }else{
          //this user exist, but not registed this token
          var gcmToken = await ifExists.gcmToken(userid, token);

          if(!gcmToken){
            gcmToken = await Gcms.findOneAndUpdate({user: userid}, 
              {$push:{'tokens': token}});
            res.send({message: 'push this token into your list'})
          }else{
            res.send({message: 'you are already in this token user list'});
          }
        }

      }catch(e){
        return next({message: e.message});
      }
    
  },


  sendMessages: async function({params, current_user, body, query}, res, next){

    var {
      to,
      text,
    } = body;   

    if (params.id == current_user._id){
      
      try{
        var user = await Gcms.findOne({user: to});
        if(user){
           var regTokens = user.tokens;
        }else{
          console.log("failed to find destination user");
          return next({message: "failed to find destination user"});
        }
      }catch(e){
        return next(e);
      }
      
      // var content = JSON.stringify(body);   
      var message = new gcm.Message({
          collapseKey: 'demo',
          priority: 'high',
          contentAvailable: true,
          // delayWhileIdle: true,
          timeToLive: 3,
          // dryRun: true,
          data: {
              key1: text,
              key2: to,
              key3: 'chat',
              key4: 'unread',
              key5: params.id,
          },
      });

      // var regTokens = ['doR1_AtU_6Q:APA91bH5YL4-1NF-Kn4XaMwtnZK4U5zKqDrQDkrxP2zU5FLsehsSdh57c1_yWgD0fZPBEPjyN8dT6kOqBiEjhyaJg1sTMZJvAsdz4H_fXpeOmyYjo8VGd7f7ukcuLlsnAxbEwEOuw-ln'];

      // Set up the sender with you API key
      var sender = new gcm.Sender('AIzaSyD5f7HQE8I6IJNGaJAbPjL8qBYUThz83dA');

      // Now the sender can be used to send messages
      sender.send(message, { registrationTokens: regTokens }, function (err, response) {
          if(err){
            console.error(err);
          }else{
            console.log("gcm registrationTokens response:",response);
            res.send({message: "send to gcm successfully"})
          }   
      });
    }else{
      console.log("illegal user");
      res.send(current_user);
    }
  },

  storeMessages: async function({params, current_user, body, query}, res, next){
    var {
      to,
      text,
    } = body;   

    console.log("store messagaes body",body)

    if (params.id == current_user._id){
      try{
        //sometimes maybe saved twice, so delete one
        // var message = await Messages.findOne({from: params.id, to: to, 'contents.text': text.text, 'contents.uniqueId':text.uniqueId}).exec();
        // console.log(message == null);
        // if(message){
        //   console.log("1111111111111111111111111111111111111111111111duplicated")
        // }else{
        //   console.log("2222222222222222222222222222222222222222222222single")
        var message = await Messages.create({from: params.id, to: to, contents: text});
        // }
        res.send(message);
      }catch(e){
        console.log("store message failed", e)
        return next({message: "failed to store this message"});
      }
    }else{
      console.log("illegal user");
      res.send(current_user);
    }
  },

  // getEarlierMessages: async function({query:{from = "none", to = "none"}}, res, next){
  getEarlierMessages: async function({params, current_user, body, query}, res, next){
    console.log(query);
    
    var from = query.from;
    var to = query.to;
    var deadline = query.deadline;

    console.log('params.id', from);
    console.log('current_user._id', current_user._id);

    if (from == current_user._id){
      try{
        //return X pieces of messages sort by content date.
        var messages = await Messages.find({
          from: from, 
          to: to,
          "contents.date": {$lt: deadline}}).sort({'contents.date': -1}).limit(20);

        console.log("earlier 5 messages: ", messages);

        if(!messages){
          return res.send([]);
          // return next({message: "there is no earlier messages"});
        }

        return res.send(messages);
      }catch(e){
        console.log("get earlier messages failed", e)
        return next({message: "failed to get earlier messages"});
      }
    }else{
      console.log("illegal user!");
      res.send(current_user);
    }



    // var users = {};
    // users['from'] = query.from;
    // users['to'] = query.to;
    // console.log("from and to:",users['from'],users['to']);
    // try{
      
    //   var user_from = await Users.findByUsername(users['from']+"@lakeheadu.ca");
    //   if(!user_from){
    //     user_from = "none";
    //   }
    //   user_from = user_from._id;

    //   var user_to = await Users.findByUsername(users['to']+"@lakeheadu.ca");
    //   if(!user_to){
    //     user_to = "none";
    //   }
    //   user_to = user_to._id;

    //   console.log(user_from+" "+user_to);

    //   var messages = await Messages.find({$or: [{from :user_from, to: user_to},{from :user_to, to: user_from}]})
    //     .sort('created_at')
    //     .populate("from","username avatar")
    //     .populate("to","username avatar")
    //     .exec();

    //   if(!messages){
    //     return next({message: "there is no earlier messages"});
    //   }
    //   console.log(messages);
    //   return res.send(messages);

    // }catch(e){
    //   return next({message: e.message});
    // }   

  }
});
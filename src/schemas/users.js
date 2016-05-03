var mongoose = require('mongoose');
var sendMail = require('../utilities/mailer');
var ejs = require('ejs');
var fs  = require('fs');

mongoose.plugin(require('./baseSchema'));

var Schema = mongoose.Schema;

var usersSchema = new Schema({
  username: String,
  password: String,
  activated: Boolean,
  activate_token: String,
  friends: [{type: Schema.Types.ObjectId, ref:"Users",}],  
  avatar: {type: String, default:"images/default_avatar.png"},
});

usersSchema.statics = {

  // fetch: (cb) => find({}).exec(cb),
  findAll: function (cb){
    return this.find({}).exec(cb);
  },

  findByUsername: function(username,cb){
    return this.findOne({username: username}).exec(cb);
  },

  findByUserId: function(id,cb){
    return this.findById({_id: id}).exec(cb);
  },

  removeAll: function(cb){
    return this.remove({}).exec(cb);
  },

  activateUser: function(id, cb){
    return this.update({_id: id},{
          activated: true,
          activate_token: '',
        }).exec(cb);
  },

  findBySimilarUsername: function (username, cb){
    return this.find({ username: new RegExp(username, 'i')}).exec(cb);
  }

}

usersSchema.methods.sendVerification = function () {

  var subject = 'lumi email verification';

  var str = fs.readFileSync('./emailtemplates/verification.ejs', 'utf8');
  var template = ejs.compile(str, {});
  var verificationLink = "http://localhost:3100/users/" + this._id + "/verification?activate_token="+ this.activate_token;
  
  var body = template({username: this.username, link: verificationLink});

  sendMail(this.username, subject, body, function(err){
    if(err){
      console.error(err);
    }else
      console.log("send verification email successfully!");
  });
};

usersSchema.methods.addFriend = function(username2){
    this.friends.push({username:username2});
}
module.exports = usersSchema;
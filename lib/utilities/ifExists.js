'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var Users = require('../models/users');
var Sessions = require('../models/sessions');
var Gcms = require('../models/googleCloudMessaging');
var Notification = require('../models/notifications');

var ifExists = {

  user: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(username) {
      var user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return Users.findByUsername(username);

            case 3:
              user = _context.sent;

              console.log("this user", user);

              if (!user) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return', user);

            case 9:
              return _context.abrupt('return', false);

            case 10:
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', false);

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 12]]);
    }));

    return function user(_x) {
      return ref.apply(this, arguments);
    };
  }(),

  findRecent: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
      var recent;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return Users.findById(id).populate('recent', '_id');

            case 3:
              recent = _context2.sent;

              console.log('recent if:', recent);
              return _context2.abrupt('return', recent);

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2['catch'](0);

              console.log(_context2.t0);
              return _context2.abrupt('return', false);

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 8]]);
    }));

    return function findRecent(_x2) {
      return ref.apply(this, arguments);
    };
  }(),

  gcmToken: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(userid, token) {
      var gcm;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return Gcms.findOne({ 'user': userid, tokens: token }).exec();

            case 3:
              gcm = _context3.sent;

              if (!gcm) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt('return', gcm);

            case 8:
              return _context3.abrupt('return', false);

            case 9:
              _context3.next = 15;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3['catch'](0);

              console.log(_context3.t0);
              return _context3.abrupt('return', false);

            case 15:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 11]]);
    }));

    return function gcmToken(_x3, _x4) {
      return ref.apply(this, arguments);
    };
  }(),

  gcmUser: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(userid) {
      var gcm;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return Gcms.findOne({ user: userid }).exec();

            case 3:
              gcm = _context4.sent;

              if (!gcm) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt('return', gcm);

            case 8:
              return _context4.abrupt('return', false);

            case 9:
              _context4.next = 15;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4['catch'](0);

              console.log(_context4.t0);
              return _context4.abrupt('return', false);

            case 15:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 11]]);
    }));

    return function gcmUser(_x5) {
      return ref.apply(this, arguments);
    };
  }(),

  notification: function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(userid) {
      var result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return Notification.findOne({ 'user': userid }).exec();

            case 3:
              result = _context5.sent;

              if (!result) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt('return', result);

            case 8:
              return _context5.abrupt('return', false);

            case 9:
              _context5.next = 14;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5['catch'](0);
              return _context5.abrupt('return', false);

            case 14:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 11]]);
    }));

    return function notification(_x6) {
      return ref.apply(this, arguments);
    };
  }()
};

module.exports = ifExists;
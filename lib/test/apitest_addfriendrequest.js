'use strict';

// babel --watch=./src --out-dir=./lib
var fetch = require('node-fetch');

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "SESSION-TOKEN": "98de7fc6-cc58-a818-1b9d-235cd8d74ca5"
};

var body = JSON.stringify({
  from: "NwRfA",
  to: "574761f43ce12658159781b3"
});

var contents = {
  method: 'POST',
  headers: headers,
  body: body
};

fetch('http://localhost:3100/users/addFriendRequest/574761f43ce12658159781b5', contents).then(function (res) {
  return res.json();
}).then(function (json) {
  console.log(json);
}).catch(function (err) {
  console.log(err);
});
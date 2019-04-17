const https = require('https');
var rootCas = require('ssl-root-cas/latest').create();
rootCas.addFile(__dirname + '/ssl/chain.pem');
require('https').globalAgent.options.ca = rootCas;

const Light = require("./classes/light.js");

let apiserver = {host: 'scontrol.hedium.nl', port: 3000, path: '/api/light', method: '', headers: {'Content-Type': 'application/json'}};

// Needs server = server data object. data = data object.
function sendData(server, data, callback) {
  //make connection with server, use data from user.
  let req = https.request(server, res => {
    res.setEncoding('utf8');

    res.on('data', chunk => {
      callback(chunk);
    });
  });

  //give error response.
  req.on('error', e => {
    callback(`Error: ${e}`);
  });

  //write data to server
  req.write(JSON.stringify(data));
  req.end();
}

exports.addLight = function (title, pin, callback) {
  let tmplight = new Light("test01", 5);
  tmplight.send(apiserver, sendData, c => {
    callback(c);
  });
}

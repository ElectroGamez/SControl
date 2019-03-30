const express = require("express");
const five = require("johnny-five");
const fs = require('fs');
const joi = require('joi');

const app = express();
const board = new five.Board({ port: "/dev/ttyUSB0" });

const Light = require("./classes/light.js");
const LightCollection = require("./classes/lightCollection.js");
global.Report = require('./classes/report.js');

global.report = new Report(fs);
let lightCollection = new LightCollection(fs);


app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const lightSchema = joi.object().keys({
  title: joi.string().alphanum().min(3).max(20).required(),
  pin: joi.number().integer().min(2).max(13).required()
});

board.on("ready", function () {

  app.get('/api/devices', function (req, res, next) {
    res.json(devices);
  });

  app.post('/api/devices', function (req, res, next) {
    joi.validate({title: req.body.title, pin: req.body.pin}, lightSchema, function (error, value) {
      if (error === null) {
        let light = new Light(five, req.body.title, req.body.pin);
        let callback = {title: req.body.title, pin: req.body.pin};

        res.status(200).send({
          success: true,
          message: "Added the new light.",
          light: callback
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Invalid object",
          error: error.details[0].message
        });
      }

    })
  });
  app.listen(3000, () => console.log('Listening on port 3000'));
});

// board.on("ready", function () {
//   app.get('/api/devices', function (req, res, next) {
//     res.json(devices);
//   });
//
//   app.put('/api/devices/:id', function (req, res, next) {
//     if (!tokens.includes(req.body.token)) return res.status(403).send("Invalid token.");
//     if (!devices[req.params.id]) return res.status(404).send("device not found.");
//     if (!req.body.value) return res.status(400).send("Please provide the new state. value: 0/1");
//     devices[req.params.id].value = req.body.value;
//     updateDevices();
//     saveDevices()
//     res.send(devices[req.params.id]);
//   });
//
//   app.post('/api/devices', function (req, res, next) {
//     if (!tokens.includes(req.body.token)) return res.status(403).send("Invalid token.");
//     if (!req.body.title || !req.body.value || !req.body.simple || !req.body.pin) return res.status(400).send("Invalid object.");
//     const device =
//     {
//       title: req.body.title,
//       value: req.body.value,
//       simple: req.body.simple,
//       pin: req.body.pin
//     }
//
//     devices.push(device)
//     saveDevices()
//     updateDevices();
//     res.send(device)
//   });
//
//   app.listen(3000, () => console.log('Listening on port 3000'));
// });
//
// function updateDevices() {
//   for (i = 0; i < devices.length; i++) {
//     if (devices[i].value == "1") {
//       var pin = new five.Pin(devices[i].pin);
//       pin.high();
//     } else {
//       var pin = new five.Pin(devices[i].pin);
//       pin.low();
//     }
//   }
// }
//
// function saveDevices() {
//   fs.writeFile("devices.json", JSON.stringify(devices), 'utf8', function (err) {
//     if (err) {
//         console.log("An error occured while writing JSON Object to File.");
//         return console.log(err);
//     }
//
//     console.log("JSON file has been saved.");
// });
// }

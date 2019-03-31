const express = require("express");
global.five = require("johnny-five");
const fs = require('fs');
const joi = require('joi');
const https = require('https');

const privateKey = fs.readFile('./ssl/privkey.pem');
const certificate = fs.readFile('./ssl/cert.pem');


const app = express();
global.board = new five.Board({ port: "/dev/ttyUSB0" });

const Light = require("./classes/light.js");
const LightCollection = require("./classes/lightCollection.js");
global.Report = require('./classes/report.js');

global.report = new Report(fs);


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
  let lightCollection = new LightCollection(fs, Light);

  app.get('/api/devices', function (req, res, next) {
    let tempArray = new Array();

    for (let i = 0; i < lightCollection.collection.length; i++) {
      lightCollection.collection[i].stringify(data => {
        tempArray.push(data);
      });
    }
    res.json(tempArray);
  });

  app.post('/api/devices', function (req, res, next) {
    joi.validate({title: req.body.title, pin: req.body.pin}, lightSchema, function (error, value) {
      if (error === null) {
        let light = new Light(req.body.title, req.body.pin);
        let callback = {title: req.body.title, pin: req.body.pin};

        lightCollection.add(light);

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

  app.put('/api/devices/:id/off', function (req, res, next) {
    if (!lightCollection.collection[req.params.id]) return res.status(404).send("device not found.");
    lightCollection.collection[req.params.id].pin.low();
    lightCollection.collection[req.params.id].stringify(data => {
      res.send(data);
    });
  });

  app.put('/api/devices/:id/on', function (req, res, next) {
    if (!lightCollection.collection[req.params.id]) return res.status(404).send("device not found.");
    lightCollection.collection[req.params.id].pin.high();
    lightCollection.collection[req.params.id].stringify(data => {
      res.send(data);
    });
  });

  https.createServer({key: privateKey, cert: certificate}, app).listen(3000);
});

const express = require("express");
global.five = require("johnny-five");
const fs = require('fs');
const joi = require('joi');
const https = require('https');

const app = express();
global.board = new five.Board({ port: "COM14", repl: false });

const Light = require("./classes/light.js");
const LightCollection = require("./classes/lightCollection.js");

const Rgb = require("./classes/rgb.js");

global.Report = require('./classes/report.js');
global.report = new Report(fs);

let rgbs = [];

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

const rgbSchema = joi.object().keys({
  title: joi.string().alphanum().min(3).max(20).required(),
  pin: joi.array().items(joi.number().integer().min(2).max(13).required(), joi.number().integer().min(2).max(13).required(), joi.number().integer().min(2).max(13).required())
});

board.on("ready", function () {
  let lightCollection = new LightCollection(fs, Light);

  app.get('/api/light', function (req, res, next) {
    let tempArray = new Array();

    for (let i = 0; i < lightCollection.collection.length; i++) {
      lightCollection.collection[i].stringify(data => {
        tempArray.push(data);
      });
    }
    res.json(tempArray);
  });

  app.post('/api/light', function (req, res, next) {
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

  app.put('/api/light/:id/off', function (req, res, next) {
    if (!lightCollection.collection[req.params.id]) return res.status(404).send("device not found.");
    lightCollection.collection[req.params.id].pin.low();
    lightCollection.collection[req.params.id].stringify(data => {
      res.send(data);
    });
  });

  app.put('/api/light/:id/on', function (req, res, next) {
    if (!lightCollection.collection[req.params.id]) return res.status(404).send("device not found.");
    lightCollection.collection[req.params.id].pin.high();
    lightCollection.collection[req.params.id].stringify(data => {
      res.send(data);
    });
  });

  //LED LIGHT STRIP LISTENER (still have to fix all this.)

  app.get('/api/rgb', function (req, res, next) {
    res.send("dont have this yet.");
  });

  app.post('/api/rgb', function (req, res, next) {
    //validate (user) input
    joi.validate({title: req.body.title, pin: req.body.pin}, rgbSchema, function (error, value) {
      if (error === null) {
        //create item
        let rgb = new Rgb(req.body.title, req.body.pin);
        rgb.led.on();
        rgb.led.color("#FF0000");
        //create callback for client, (to fix sending back whole board)
        let callback = {title: req.body.title, pin: req.body.pin};

        //need to make this
        //rgbCollectiong.add(rgb);

        rgbs.push(rgb);

        res.status(200).send({
          success: true,
          message: "Added the new RGB Light.",
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

  app.put('/api/rgb/:id', function (req, res, next) {
    console.log(req.body);
    rgbs[req.params.id].led.color(req.body.hex);
    res.send(req.body.hex);
  });

  https.createServer({
    key: fs.readFileSync('./ssl/privkey.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
  }, app)
  .listen(3000, function () {
    console.log('Example app listening on port 3000! Go to https://localhost:3000/')
  })
});

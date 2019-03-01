const express = require("express");
const five = require("johnny-five");

const app = express();
const board = new five.Board({ port: "COM5" });

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const sensors = [
  {
    "title": "Sensor1",
    "status": 0,
    "simple": true
  }
];

board.on("ready", function () {
  app.get('/api/sensors', function (req, res, next) {
    res.json(sensors);
  });

  app.post('/api/sensors', function (req, res, next) {
    const sensor = {
      title: req.body.title,
      status: req.body.status,
      simple: req.body.simple
    }
    console.log("Added sensor");
    sensors.push(sensor)
    res.send(sensor)
  });

  app.listen(3000, () => console.log('Listening on port 3000'));
});

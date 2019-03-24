const express = require("express");
const five = require("johnny-five");

const app = express();
const board = new five.Board({ port: "COM4" });

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const devices = [
  {
    "title":"LED",
    "value": 0,
    "simple": 1,
    "pin": 2
 }
];

board.on("ready", function () {
  app.get('/api/devices', function (req, res, next) {
    res.json(devices);
  });

  app.put('/api/devices/:id', function (req, res, next) {
    if (!devices[req.params.id]) res.status(404).send("device not found.");
    res.json(devices);
  });

  app.post('/api/devices', function (req, res, next) {
    const device =
    {
      title: req.body.title,
      value: req.body.value,
      simple: req.body.simple,
      pin: req.body.pin
    }

    console.log("Added device");
    devices.push(device)
    res.send(device)
  });

  app.listen(3000, () => console.log('Listening on port 3000'));
});

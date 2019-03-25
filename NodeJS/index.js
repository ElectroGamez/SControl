const express = require("express");
const five = require("johnny-five");
const fs = require('fs');

const app = express();
const board = new five.Board({ port: "COM4" });

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let devices = [];

try {
  devices = JSON.parse(fs.readFileSync("devices.json"));
  console.log("Loaded old devices.");
} catch (e) {
  console.log("Failed to load old devices. Making new array.");
};

const tokens = [
  "kTTNb53LREmAGY5z03FOKqx4f",
  "InZ30TUr11OAJoz8t7x1WUDO3"
]

board.on("ready", function () {
  app.get('/api/devices', function (req, res, next) {
    res.json(devices);
  });

  app.put('/api/devices/:id', function (req, res, next) {
    if (!tokens.includes(req.body.token)) return res.status(403).send("Invalid token.");
    if (!devices[req.params.id]) return res.status(404).send("device not found.");
    if (!req.body.value) return res.status(400).send("Please provide the new state. value: 0/1");
    devices[req.params.id].value = req.body.value;
    updateDevices();
    saveDevices()
    res.send(devices[req.params.id]);
  });

  app.post('/api/devices', function (req, res, next) {
    if (!tokens.includes(req.body.token)) return res.status(403).send("Invalid token.");
    if (!req.body.title || !req.body.value || !req.body.simple || !req.body.pin) return res.status(400).send("Invalid object.");
    const device =
    {
      title: req.body.title,
      value: req.body.value,
      simple: req.body.simple,
      pin: req.body.pin
    }

    devices.push(device)
    saveDevices()
    updateDevices();
    res.send(device)
  });

  app.listen(3000, () => console.log('Listening on port 3000'));
});

function updateDevices() {
  for (i = 0; i < devices.length; i++) {
    if (devices[i].value == "1") {
      var pin = new five.Pin(devices[i].pin);
      pin.high();
    } else {
      var pin = new five.Pin(devices[i].pin);
      pin.low();
    }
  }
}

function saveDevices() {
  fs.writeFile("devices.json", JSON.stringify(devices), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});
}

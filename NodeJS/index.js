var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort("COM5", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendfile("index.html");
});

app.post('/', function(req, res){
  console.log('Got data from web:', req.body.data);

  port.write(req.body.data, (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
  });
  res.end();
});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})

// Read the port data
port.on("open", () => {
  console.log('serial port open');
});
parser.on('data', data =>{
  console.log('got word from arduino:', data);
});

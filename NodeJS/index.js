const express = require("express");
const bodyParser = require("body-parser");
const five = require("johnny-five");

const app = express();

const board = new five.Board({ port: "COM5" });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

board.on("ready", function() {
  const servo = new five.Servo(10);

  app.get('/css.css',function(req,res){
    res.sendfile("css.css");
  });

  app.get('/',function(req,res){
    res.sendfile("index.html");
  });

  app.post('/', function(req, res){
    let data = req.body.data;
    console.log("INFO: Servo moved to", data);
    if (isNaN(data)) return console.log("Not a number");
    servo.to(data);
    res.end();
  });

  app.listen(3000,function(){
    console.log("Started on PORT 3000");
  });

});

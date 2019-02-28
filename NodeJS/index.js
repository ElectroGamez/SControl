var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();

var five = require("johnny-five");
var board = new five.Board({
  port: "COM5"
});

board.on("ready", function() {
  var servo = new five.Servo(10);


  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/',function(req,res){
    res.sendfile("index.html");
  });

  app.post('/servo', function(req, res){
    let data = req.body.data;
    
    if (isNaN(data)) return console.log("Not a number");
    servo.to(data);
    res.end();
  });

  app.listen(3000,function(){
    console.log("Started on PORT 3000");
  });

});

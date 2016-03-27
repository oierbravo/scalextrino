//index.js
var express = require('express');



var five = require("johnny-five"),
  board = new five.Board();

var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;

board.on("ready", function() {
    var speeds = [0,0];
    var motors = [
  		new five.Motor(configs.M1),
  		new five.Motor(configs.M2)
  	];

  	board.repl.inject({
    	motor1: motors[0],
    	motor2: motors[1]
 	});

  	motors[0].forward(speeds[0]);
  	motors[1].forward(speeds[1]);


	var app = express();
	
    app.set('showStackError', true);
// Set swig as the template engine
	app.engine('html', require('ejs').renderFile);

	// Set views path and view engine
	app.set('view engine', 'html');
	app.set('views', './views');


	app.use(express.static(__dirname + '/public'));
	app.use('/bower_components', express.static(__dirname + '/bower_components'));
    //app.use(express.static(__dirname + '/bower_components'));
    app.get('/', function (req, res) {
	  res.render('index');
	});
	app.get('/test', function (req, res) {
	  res.render('test');
	});



	app.get('/motor1/:speed',function(req,res){
		speeds[0] = req.params.speed;
		console.log('M1:' + speeds[0]);
		motors[0].forward(speeds[0]);
		res.sendStatus(200);
	});
	app.get('/motor2/:speed',function(req,res){
		speeds[1] = req.params.speed;
		console.log('M2:' + speeds[1]);
		motors[1].forward(speeds[1]);
		res.sendStatus(200);
	});

    
    var port = 3000;
	app.listen(port, function () {
	  console.log('Example app listening on port ' + port);
	});


});

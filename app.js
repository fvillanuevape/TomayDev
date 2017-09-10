const SERVER_PORT=8081;
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    var led = new five.Pin(13);

    var express = require('express');
    var delay=require('delay');
    var app = express();
    app.all('*', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Content-Type, X-Auth-Token');
        next();
    });
    app.get('/', function(req, res) {
        res.sendFile('index.html', { root: '.' });
    });

    app.get('/:pin/state', function(req, res) {
        var pins = {
            'led': led
        };
        if (pins.hasOwnProperty(req.params.pin)) {
            pins[req.params.pin].query(function(state) {
                res.send(state);
            });
        }
        else {
            var errorMessage = "Error your pin =>"+pins.led;
            res.send(errorMessage);
        }
    });

    app.get('/led/off', function(req, res) {
        led.low();
        res.send("LED OFF");
    });

    app.get('/led/on', function(req, res) {
        led.high();
        res.send("LED ON")
    });
    app.get('led/blink', function (red, res) {
        led.blink(1000);
        res.send("LED BLINK")

    });

    app.listen(SERVER_PORT, function() {
        console.log("Server's up at http://localhost:"+SERVER_PORT);
    });
});
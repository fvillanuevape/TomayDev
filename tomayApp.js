const SERVER_APP=8090;
var express = require('express');
var app = express();
var io = require('socket.io')(app.listen(SERVER_APP));
var five = require('johnny-five');
app.all('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Content-Type, X-Auth-Token');
    next();
});
app.use(express.static(__dirname + '/app'));

app.get('/', function (req,res) {
    res.sendFile(__dirname + '/tomayWeb.html');
});


var board = new five.Board({
    repl:false
});

board.on('ready', function () {
    var anode = new five.Pin(13);
    var blink = true;

    io.on('connection', function (socket) {
        socket.on('azul', function (){
            //NOT RGB
        });

        socket.on('verde', function (){
            //NOT RGB
        });

        socket.on('rojo', function (){
            //NOT RGB
        });

        socket.on('stop', function (){
            //Stop Blink
            /*if (blink){
                anode.stop(); // to stop blinking
                blink = false;
            }
            else{
                anode.blink(1000);
                blink = true;
            }*/
        });

        socket.on('off', function (){
            anode.low();  // to shut it off (stop doesn't mean "off")
        });

        socket.on('on', function (){
            anode.high(); // to turn on, but not blink
        });

    });
});

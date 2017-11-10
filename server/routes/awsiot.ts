import {Request, Response, Router} from "express";
import {app} from "../app";
const iotRouter: Router = Router();
const http = require('http').Server(app);
const io = require('socket.io')(http);
http.listen(3000, function () {
    console.log('listenting on 3000');
});
var awsIot = require('aws-iot-device-sdk');
var path = require('path');
var thingShadows = awsIot.thingShadow({
    keyPath: path.join(__dirname, '/../../../certs/8b981128a4-private.pem.key'),
    certPath: path.join(__dirname, '/../../../certs/8b981128a4-certificate.pem.crt'),
    caPath: path.join(__dirname, '/../../../certs/VeriSign-Class-3-Public-Primary-Certification-Authority-G5.pem'),
    debug: true,
    host: 'ab71sq1275oy3.iot.ap-southeast-1.amazonaws.com'
});
thingShadows.on('connect', function () {
    console.log('Connected to AWS IoT 2 2 2 2 22');
    thingShadows.subscribe('lightStatus');
    thingShadows.register('topdkiot', {}, function () {});
});
thingShadows.on('message', function (topic, payload) {
    // console.log('message', topic, payload.toString());
    io.emit('message', { type: 'new-message', text: payload.toString()});
});
iotRouter.get("/ping", (request: Request, response: Response) => {
    response.json({
        status: 'No device connected',
    });
});

io.on('connection', (socket) => {

    console.log('user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        io.emit('message', { type: 'new-message', text: message });
    });

});

export {iotRouter};

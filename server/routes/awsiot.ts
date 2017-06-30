import { Request, Response, Router } from "express";
const iotRouter: Router = Router();

var clientTokenUpdate;
var rval = 187;
var gval = 114;
var bval = 222;
var awsIot = require('aws-iot-device-sdk');
var path = require('path');
var thingShadows = awsIot.thingShadow({
   keyPath: path.join(__dirname, '/../../../certs/private.pem.key'),
   certPath: path.join(__dirname, '/../../../certs/certificate.pem.crt'),
   caPath: path.join(__dirname, '/../../../certs/root-CA.crt'),
//
// The 'debug' option lets you see more information about the connection to
// AWS IoT via console messages.  If you're having trouble connecting, try
// setting this to 'true' for clues about what might be going wrong.
//
   debug: true,
//
// Replace 'XXX...' with your endpoint and 'YYY...' with your region
// on the following line
//
   host: 'ab71sq1275oy3.iot.us-east-2.amazonaws.com'
});

//
// This will print a console message when the connection to AWS IoT
// completes.
//
thingShadows.on('connect', function() {
   console.log('Connected to AWS IoT');
});


iotRouter.get("/ping", (request: Request, response: Response) => {
  console.log("Server hit ping")
  thingShadows.on('connect', function() {
//
// After connecting to the AWS IoT platform, register interest in the
// Thing Shadow named 'RGBLedLamp'.
//
    thingShadows.register( 'RGBLedLamp', {}, function() {

// Once registration is complete, update the Thing Shadow named
// 'RGBLedLamp' with the latest device state and save the clientToken
// so that we can correlate it with status or timeout events.
//
// Thing shadow state
//
       var rgbLedLampState = {"state":{"desired":{"red":rval,"green":gval,"blue":bval}}};

       clientTokenUpdate = thingShadows.update('RGBLedLamp', rgbLedLampState  );
//
// The update method returns a clientToken; if non-null, this value will
// be sent in a 'status' event when the operation completes, allowing you
// to know whether or not the update was successful.  If the update method
// returns null, it's because another operation is currently in progress and
// you'll need to wait until it completes (or times out) before updating the
// shadow.
//
       if (clientTokenUpdate === null)
       {
          console.log('update shadow failed, operation still in progress');
       }
    });
});
thingShadows.on('status',
    function(thingName, stat, clientToken, stateObject) {
       console.log('received '+stat+' on '+thingName+': '+
                   JSON.stringify(stateObject));
//
// These events report the status of update(), get(), and delete()
// calls.  The clientToken value associated with the event will have
// the same value which was returned in an earlier call to get(),
// update(), or delete().  Use status events to keep track of the
// status of shadow operations.
//
    });

thingShadows.on('delta',
    function(thingName, stateObject) {
       console.log('received delta on '+thingName+': '+
                   JSON.stringify(stateObject));
    });

thingShadows.on('timeout',
    function(thingName, clientToken) {
       console.log('received timeout on '+thingName+
                   ' with token: '+ clientToken);
//
// In the event that a shadow operation times out, you'll receive
// one of these events.  The clientToken value associated with the
// event will have the same value which was returned in an earlier
// call to get(), update(), or delete().
//
    });
  response.json({
    text: "Hello Angular 2 Wew rwer",
    title: "Greetings. hello Greeting 44444 r445ggg",
  });
});

export { iotRouter };

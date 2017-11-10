import {Request, Response, Router} from "express";

const iotRouter: Router = Router();
let awsIot = require('aws-iot-device-sdk');
let path = require('path');
let thingShadows = awsIot.thingShadow({
  keyPath: path.join(__dirname, '/../../../certs/private.pem.key'),
  certPath: path.join(__dirname, '/../../../certs/certificate.pem.crt'),
  caPath: path.join(__dirname, '/../../../certs/root-CA.crt'),
  debug: true,
  host: 'a1wit390nm8dsr.iot.us-east-2.amazonaws.com'
});

let tableStatus = false;
let tableStatusTime = new Date();
thingShadows.on('connect', function () {
  console.log('Connected to AWS IoT 22 22 22');
  tableStatusTime.setTime(0);
  console.log('connect');
  thingShadows.subscribe('esp8266/status');
  thingShadows.on('message', function (topic, payload) {
    let status = JSON.parse(payload.toString()).table_status;
    console.log(status);
    tableStatusTime = new Date();
    tableStatus = status == 1;
  });
  //thingShadows.publish('topic_2', JSON.stringify({ test_data: 1}));
});
const TEN_SEC = 10000;
iotRouter.get("/ping", (request: Request, response: Response) => {
  console.log("Server hit ping " + tableStatusTime.getTime());
  let now = new Date();
  response.json({
    table_status: (now.getTime() - tableStatusTime.getTime() < TEN_SEC)
  });
});

export {iotRouter};

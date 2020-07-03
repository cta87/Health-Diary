const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const schedule = require('node-schedule');
// const SQLITE3 = require('sqlite3');

//================ Variable decleration ===============

var currentDaily = {}; // current log values, will get written to database at end of the day. Can be edited via front end during the day. These values are returned when frontend page is loaded. Reset to empty after written to database

//==================== Run code =======================


// sceduled task to write log values to the database
var dbWrite = schedule.scheduleJob('59 23 * * *', function(){
  console.log('Running Midnight scheduled task:');
  var unixTimestamp = Math.floor(new Date() / 1000);
  console.log(unixTimestamp);
  console.log(currentDaily);

  // set currentDaily to empty
  currentDaily = {};
});

//=================== Functions ========================


function recordDaily(){
  var mental = 1;
  var sleep = 2;
  var physical = 3;
  var productivity;
  var note;
  var physicalActivity;

  var dataObj = {
  };

  console.log(mental, sleep, physical);
  console.log(Date.now());

  return dataObj;
}

//============= API routes ==============================

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Express routes

app.get('/daily_log', function (req, res) {
   // Prepare output in JSON format
   console.log(req.body)
   res.end(JSON.stringify(currentDaily));
})

app.post('/daily_log', function (req, res) {
   // Prepare output in JSON format
   // console.log(req.body)
   currentDaily = req.body;
   currentDaily.date = Math.floor(new Date() / 1000);
   console.log(currentDaily);
   res.end('test');
})


var server = app.listen(8081, '192.168.178.100', function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})


// recordDaily();

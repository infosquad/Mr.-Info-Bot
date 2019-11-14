const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();

const discord_token = process.env.TOKEN;
const prefix = process.env.PREFIX;

const newUsers = new Discord.Collection();
var botMembers = 0;

app.get("/", (request, response) => {
  var D = new Date();
  var IP =
    request.headers["x-forwarded-for"].split(",").shift() ||
    request.connection.remoteAddress;

  function getAMPM(date) {
    var hours = date.getHours() + 1;
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  console.log(`Ping at ${getAMPM(D)}, Received from ${IP}`);
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

function getDefaultChannel(guild) {
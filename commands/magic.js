const Discord = module.require("discord.js");
const fs = require("fs");
const Jimp = require('jimp');
const Moment = require("moment-timezone");

// Not of use now :(
function getImageExtension(str) {
  return str.substring(str.lastIndexOf("."));
}

module.exports.run = async (client, message, args) => {
  if (args.length >= 1) {
    var imageurl = args[0];
    
    if (!imageurl) return message.channel.send("Provide a image url!");
    
    var msg = message.channel.send("ok, processing...");
    
    Jimp.read(imageurl).then(function (image) {
      image.quality(2.5);
      image.color([
          { apply: 'hue', params: [ -90 ] },
          { apply: 'xor', params: [ '#dd7700' ] },
          { apply: 'lighten', params: [ 5 ] }
      ]);
      image.pixelate(1.3);
         
      let outputfile = "./output/" + Math.random().toString(36).substr(2, 5) + "magic." + image.getExtension(); // create a random name for the output file
      image.write(outputfile, function () {
        // upload file
        msg.then(msg => msg.delete());
        message.channel.send({file: outputfile}).then(function () {
          // delete file
          fs.unlink(outputfile);
          console.log(`SUCCESS: ${message.author.username}, Image: ${imageurl}`);
        });
      });              
    }).catch(function (err) {
        // handle an exception
        msg.then(msg => msg.delete());
        message.channel.send("Invalid Image!").then(msg => msg.delete(2300));
        console.error("Error: " + err);
    });     
  }
}

module.exports.help = {
    name: "magic",
    description: "Adds a touch of magic to your image, ;)",
    usage: "magic <image>",
    type: "Fun" 
}
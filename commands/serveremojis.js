const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
  console.log(message.guild.emojis.map(e=>e.toString()).join(", "));
  var embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name + "'s Emojis", message.guild.iconURL)
    .setColor("3498db")
    .addField(message.guild.emojis.map(e=>e.toString()).length, message.guild.emojis.map(e => "`" + e.toString().substring(2).split(":").shift() + "`" + e.toString()).join(", "))
    .setTimestamp()

  await message.channel.send(embed=embed)
}

module.exports.help = {
    name: "serveremojis",
    description: "Grabs the server emojis",
    usage: "serveremojis",
    type: "Utility"
}
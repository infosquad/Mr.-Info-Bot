const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  let output = ["Heads", "Tails"];
  
  await message.channel.send(output[Math.floor(Math.random()*output.length)]);
}

module.exports.help = {
    name: "flipcoin",
    description: "Flip a virtual coin",
    usage: "flipcoin",
    type: "Fun"   
}
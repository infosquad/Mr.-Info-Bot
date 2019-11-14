const Discord = module.require("discord.js");
const request = require('request');
const fs = module.require("fs");

module.exports.run = async (client, message, args) => {    
    let mcmember = await args[0];
    if (!mcmember) return message.delete(), message.channel.send("Mention a valid minecraft member!").then(msg => msg.delete(2000));

    request("https://use.gameapis.net/mc/player/profile/" + mcmember, function (error, response, body) {
        if (response.statusCode == 400) return message.delete(), message.channel.send("Mention a valid minecraft member!").then(msg => msg.delete(2000));
        const mcdata = JSON.parse(body);
       
        if (!mcdata.id) return message.delete(), message.channel.send("Mention a valid minecraft member!").then(msg => msg.delete(2000));
        
        var profileSkin;
        if (mcdata.properties_decoded.textures.SKIN) {
            profileSkin = mcdata.properties_decoded.textures.SKIN.url;
        } else {
            profileSkin = "No Skin Found"
        }
       
        let embed = new Discord.RichEmbed()
          .setColor("4253f4")
          .setAuthor(mcdata.name, "https://minotar.net/avatar/" + mcdata.name)
          .setThumbnail("https://minotar.net/body/" + mcdata.name + "/100.png")
          .addField("Profile ID", mcdata.id, true)
          .addField("Premium Account", "Yes", true)
          .addField("UUID", mcdata.uuid_formatted, true)
          .addField("Skin", profileSkin, true)
          .setTimestamp()
      
        message.channel.send(embed);
    });
}

module.exports.help = {
    name: "minecraft",
    description: "Gets minecraft userinfo",
    usage: "minecraft <username>",
    type: "Utility"
}
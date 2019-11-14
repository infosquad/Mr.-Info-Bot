const Discord = module.require("discord.js");
const dateFormat = require('dateformat');
dateFormat('dddd, mmmm dS, yyyy, h:MM:ss TT');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
  };

module.exports.run = async (client, message, args) => {
  var mention = await message.mentions.members.first();
  if (!mention) mention = message.member;
  if (message.member.user.bot) return message.channel.send("Cannot get bot information!");

  var joindate = dateFormat(mention.joinedAt);
  
  if (mention.user.lastMessage) {
    var lastmessage = dateFormat(mention.user.lastMessage.createdTimestamp);  
  } else {
    var lastmessage = "No results found";
  }
  
  function rolecount() {
    var roles = 0;
    mention.roles.forEach((role) => {
      roles += 1;
    });    
    return roles;
  };
  
  let userembed = new Discord.RichEmbed()
    .setColor("4253f4")
    .setThumbnail(mention.user.displayAvatarURL)
    .addField("ID", `${mention.user.id}`, true)
    .addField("Presence", `${status[mention.user.presence.status]}`, true)
    .addField("Message last sent", `${lastmessage}`, true)
    .addField("Server join date", `${joindate}`, true)
    .addField(`Roles (${rolecount() - 1})`, `${mention.roles.filter(r => r.id !== message.guild.id).map(roles => roles.name).join(", ") || "No Roles"}`, true)
    if (mention.nickname) userembed.setAuthor(`${mention.user.username}#${mention.user.discriminator} - ${mention.nickname}`)
    else userembed.setAuthor(`${mention.user.username}#${mention.user.discriminator}`)
    if (mention.user.presence.game) userembed.setDescription(`Playing **${mention.user.presence.game.name}**`)
  
  await message.channel.send(userembed);  
}

module.exports.help = {
    name: "userinfo",
    description: "Gets userinfo from a mention or id",
    usage: "userinfo <mention> or <id>",
    type: "Utility" 
}
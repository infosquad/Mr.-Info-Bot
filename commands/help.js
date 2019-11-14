const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
  var command = args[0];
  var commandnum = 0;

  if (command) {
    try {
      var file = require(`./${command}`);
    } catch (error) {
      message.channel
        .send("That command does not exist, Take a look at *help")
        .then(msg => msg.delete(2300));
      console.error(error);
    }

    let newembed = new Discord.RichEmbed()
      .setAuthor(`Help - ${file.help.type} Command`, message.guild.iconURL)
      .setColor("3498db")
      .setImage(client.AvatarURL)
      .setFooter(
        `Bot created by @bluesn0w#9915 • ${commandnum} Commands`,
        "https://cdn.discordapp.com/avatars/282544478454022145/769bbc3c93eed5782b61e5e6edd1b9bd.png?size=2048"
      )
      .addField(file.help.usage, file.help.description);

    message.channel.send(newembed);
  }

  var done = false;

  var General = [];
  var Moderation = [];
  var Fun = [];
  var Utility = [];

  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    commandnum = files.length;

    files.forEach(file => {
      let f = require(`./${file}`);
      var namelist = f.help.name;
      var desclist = f.help.description;
      var usage = f.help.usage;
      var type = f.help.type;

      if (type == "General") General.push([namelist, desclist, usage]);
      if (type == "Moderation") Moderation.push([namelist, desclist, usage]);
      if (type == "Fun") Fun.push([namelist, desclist, usage]);
      if (type == "Utility") Utility.push([namelist, desclist, usage]);

      if (namelist == "userinfo") {
        done = true;
      }
    });

    if (done) {
      if (!command) {
        var embed = new Discord.RichEmbed()
          .setAuthor("Help", message.guild.iconURL)
          .setColor("3498db")
          .setImage(client.AvatarURL)
          .setFooter(
            `Bot created by @silenteye_#3146 • ${commandnum} Commands`,
            "https://cdn.discordapp.com/avatars/282544478454022145/769bbc3c93eed5782b61e5e6edd1b9bd.png?size=2048"
          )
          .addField("General", General.map(roles => roles[0]).join(", "), true)
          .addField(
            "Moderation",
            Moderation.map(roles => roles[0]).join(", "),
            true
          )
          .addField("Fun", Fun.map(roles => roles[0]).join(", "), true)
          .addField("Utility", Utility.map(roles => roles[0]).join(", "), true)
          .addField("Command Information", "*help <command>");

        message.channel.send(embed);
      }
    }
  });
};

module.exports.help = {
  name: "help",
  description: "Displays all the commands available",
  usage: "help",
  type: "General"
};

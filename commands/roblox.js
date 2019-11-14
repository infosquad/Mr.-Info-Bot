const Discord = module.require("discord.js");
const request = require('request');
const fs = module.require("fs");
const rbx = require('roblox-js');

const change = {
    true: "Yes",
    false: "No"
};

function purchasedMembership(id) {
    request("https://www.roblox.com/badges/roblox?userId=" + id, function (error, response, body) {
        const badgesdata = JSON.parse(body);
        for(var i = 0; i < badgesdata.RobloxBadges.length; i++) {
            var obj = badgesdata.RobloxBadges[i];

            if (obj.Name == "Welcome To The Club") {
                return true;
            }
        }
    });
}

module.exports.run = async (client, message, args) => {    
    let rblxmember = await args[0];

    if (!rblxmember) {
        return await message.channel.send({embed: {
            color: 3447003,
            title: "Mention a valid roblox member!"
        }}).then(msg => msg.delete(2000));
    }

    request("https://api.roblox.com/users/get-by-username?username=" + rblxmember, function (error, response, body) {
        if (response.statusCode == 400) {
            message.delete();
            return message.channel.send({embed: {
                color: 3447003,
                title: "Mention a valid roblox member!"
            }}).then(msg => msg.delete(2000));
        }

        const rblxdata = JSON.parse(body);

        if (rblxdata.success == false || rblxdata.errorMessage == "User not found") {
            message.delete();
            return message.channel.send({embed: {
                color: 3447003,
                title: "Mention a valid roblox member!"
            }}).then(msg => msg.delete(2000));
        }
      
        let profileID = rblxdata.Id; 
        let profileAvatar = "https://www.roblox.com/headshot-thumbnail/image?userId=" + profileID + "&width=420&height=420&format=png";
        let profileBody = "https://www.roblox.com/outfit-thumbnail/image?userOutfitId=" + profileID + "&width=420&height=420&format=png"
        var purchasedM;

        if (purchasedMembership(profileID)) {
            purchasedM = "Yes";
        } else {
            purchasedM = "No";
        }

        rbx.getBlurb({userId: profileID})
        .then(function (blurb) {
          console.log(rblxdata);

          let embed = new Discord.RichEmbed()
            .setAuthor(rblxdata.Username, profileAvatar)
            .setColor("3498db")
            .setThumbnail(profileBody)
            .addField("Profile ID", profileID, true)
            .addField("Description", blurb || "No Description", true)
            .addField("BC Member", purchasedM)
            .setTimestamp()

          message.channel.send(embed=embed)
          .catch (function (err) {
              message.delete();
              return message.channel.send({embed: {
                  color: 3447003,
                  title: "Something went Wrong! " + err
              }}).then(msg => msg.delete(2000));
          });

        });
    });
}

module.exports.help = {
    name: "roblox",
    description: "Gets roblox userinfo",
    usage: "roblox <username>",
    type: "Utility"
}
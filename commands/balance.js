const Discord = require('discord.js');

module.exports = {
    name: 'balance',
	description: 'balance',
    execute( message, args, collection) {
        var query = { discordid: message.author.id};
        collection.find(query).toArray(function(err, result) {
            if (result != undefined && result.length != 0) {
                var embed = new Discord.RichEmbed()
                .setTitle(`Seems like you've got ${result[0].balance}¥ left to spend in our café. 💕`)
                .setDescription("and now leave me alone xd")
                .setColor([244, 0, 84])
                message.channel.send({embed}); 
            }
        }); 
    }
}
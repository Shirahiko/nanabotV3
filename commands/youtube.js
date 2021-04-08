const Discord = require('discord.js');

module.exports = {

    name: 'youtube',
    description: 'Zest\'s Youtube',
    execute(message, args)
    {
        const embed = new Discord.MessageEmbed()
            /*
            * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
            */
            .setColor([244, 0, 84])
            .setTitle("ZEST AMV is the youtube channel of ZEST & Shirahiko")
            .setURL("https://www.youtube.com/channel/UCAo6nC6I9yk2X4xqQThhhew")
            .setDescription(`Oh it looks like you're in need of some lewd Videos Master....`)
            .setImage("https://cdn.discordapp.com/attachments/748991185670111426/829823704640782346/follow-on-yt.gif")
            .setTimestamp();   

        message.channel.send({embed});
    }
}
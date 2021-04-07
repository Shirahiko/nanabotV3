const Discord = require('discord.js');

module.exports = {
    name: 'balance',
    description: 'balance',
    execute(message, args, collection)
    {
        let query = {discordid: message.author.id};
        collection.find(query).toArray(async function (err, result)
        {
            if (result === undefined || result.length === 0)
            {
                result = [{discordid: message.author.id, balance: 50, lastwork: null}];
                await collection.insertOne(result[0]);
            }

            let embed = new Discord.MessageEmbed()
                .setTitle(`Seems like you've got ${result[0].balance}¥ left to spend in our café. 💕`)
                .setDescription("and now leave me alone xd")
                .setColor([244, 0, 84])
            await message.channel.send({embed});
        });
    }
}
const Discord = require('discord.js')

const client = new Discord.Client();

module.exports = {
    name: 'balance',
    description: 'question:',
    execute(message, args, collection)
    {

        var query = {discordid: message.author.id};

        collection.find(query).toArray(async function (err, result)
        {

            if (result === undefined || result.length === 0)
            {
                result = [{  discordid: message.author.id , balance: 50, lastwork: null }];
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
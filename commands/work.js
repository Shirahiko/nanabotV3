const Discord = require('discord.js');
const ms = require('parse-ms');

module.exports = {
    name: 'work',
    aliases: ['dailies'],
    description: 'Earn some money!',

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

            let timeout = 8.64e+7
            let amount = Math.floor(Math.random() * 200) + 500;
            const lastDaily = result[0].lastwork;

            if (lastDaily !== null && timeout - (Date.now() - lastDaily) > 0)
            {
                let time = ms(timeout - (Date.now() - lastDaily));

                await message.channel.send(`You've already helped us out alot! You can come back and work in **${time.hours}h ${time.minutes}m ${time.seconds}s**! `);
            } else
            {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(`Dailies`, message.author.displayAvatarURL)
                    .setColor([145, 255, 214])
                    .addField('Thank you for helping us out at the café today! ', `You have earned: **${amount}¥** 💰`);

                await message.channel.send(embed);

                try
                {
                    collection.updateOne(
                        {discordid: message.author.id},
                        {$set: {balance: (result[0].balance + amount), lastwork: Date.now()}});
                } catch (e)
                {
                    console.log(e);
                }
            }
        });
    }
}
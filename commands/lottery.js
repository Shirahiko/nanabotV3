const weightedlist = require('../weighted-list');

module.exports = {
    name: 'lottery',
    aliases: ['lottery'],
    cooldown: 10,
    description: 'try your luck',
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

            let balance = result[0].balance;
            if (balance < 100)
            {
                message.channel.send(`Uhh.. sorry ${message.author.username} you need atleast **100¥** to play this game...`);
                return;
            }

            const array = [['a', 70000],
                ['b', 20000],
                ['c', 20000],
                ['d', 30000],
                ['e', 1000],
                ['f', 9000]];

            weightedlist.pushAll(array);
            let event = weightedlist.getRandom();
            let change = 0;

            switch (event)
            {
                case 'b':
                    message.channel.send(`Oh. You've won 50¥. That's okay I guess.`);
                    change = -50;
                    break;
                case 'c':
                    message.channel.send(`Oh. You've won a kiss.. just kidding. Here you go, 100¥`);
                    change = 0;
                    break;
                case 'd':
                    message.channel.send(`Oh. You've won a kiss.. just kidding. Here you go, 300¥`);
                    change = 200;
                    break;
                case 'e':
                    message.channel.send(`Not Bad! You are quiet luck! Here you go. 1000¥`);
                    change = 900;
                    break;
                case 'f':
                    message.channel.send(`There you go, 500¥`);
                    change = 400;
                    break;
                case 'a':
                default: //default is lose always
                    message.channel.send('Oh no.. seems like you won nothing.');
                    change = -100;
                    break;
            }

            try
            {
                await collection.updateOne(
                    {discordid: message.author.id},
                    {$set: {balance: (result[0].balance + change)}});
            } catch (e)
            {
                console.log(e);
            }
        });
    }
}
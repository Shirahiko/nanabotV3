const weightedlist = require('../weighted-list');

module.exports = {
    name: 'lottery',
    aliases: ['lottery'],
    cooldown: 10,
    description: 'try your luck',
    execute(message, args, collection) {
        var query = { discordid: message.author.id };

        collection.find(query).toArray(function (err, result) {
            if (result === undefined || result.length === 0) return;

            let balance = result[0].balance;
            if (balance < 100) {
                message.channel.send(`Uhh.. sorry ${message.author.username} you need atleast **100¥** to play this game...`);
                return;
            }

            const array = [['a', 70000],
            ['b', 20000],
            ['c', 20000],
            ['d', 30000],
            ['e',  1000],
            ['f',  9000]];

            weightedlist.pushAll(array);
            var event = weightedlist.getRandom();
            var change = 0;

            switch(event){
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
                default: //default is to lose always
                    message.channel.send('Oh no.. seems like you won nothing.');
                    change = -100;
                    break;
            }       

            try{
                collection.updateOne(
                    { discordid: message.author.id},
                    { $set: { balance : (result[0].balance + change)}} ); 
            } catch (e) {
                print(e);
            }
        });
    }
}
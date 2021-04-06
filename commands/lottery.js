const Discord = require('discord.js')
const ms = require('parse-ms')
const weightedlist = require('../weighted-list');

module.exports = {
    name: 'lottery',
    aliases: ['lottery'],
    cooldown: 10,
    description: 'try your luck',
    execute(message, args, collection) {


        var query = { discordid: message.author.id };



        collection.find(query).toArray(async function (err, result) {


            if (result === undefined || result.length === 0)
            {
                result = [{  discordid: message.author.id , balance: 50, lastwork: null }];
                await collection.insertOne(result[0]);
            }

            let balance = result[0].balance
            if (balance < 100)
            {
                await message.channel.send(`Uhh.. sorry ${message.author.username}  you need atleast **100¥** to play this game...`);
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

            if (event === 'a') {
                message.channel.send('Oh no.. seems like you won nothing.');
                change = -100;


            } else if (event === 'b') {

                message.channel.send(`Oh. You've won 50¥. That's okay I guess.`);
                change = -50;

            } else if (event === 'c') {

                message.channel.send(`Oh. You've won a kiss.. just kidding. Here you go, 100¥`);
               change = 0;

            } else if (event === 'd') {

                message.channel.send(`Oh. You've won a kiss.. just kidding. Here you go, 300¥`);
                change = 200;

            } else if (event === 'e') {

                message.channel.send(`Not Bad! You are quiet luck! Here you go. 1000¥`);
                change = 900;
            }


             else if (event === 'f') {
             message.channel.send(`There you go, 500¥`);
             change = 400;
            }

         

            try{

                await collection.updateOne(
                    { discordid: message.author.id},
                    { $set: { balance : (result[0].balance + change)}}
         

         
         
                ); } catch (e) {
                 print(e);
              }
         
            


        });
    }



}



    ;

module.exports = {
    name: 'bid',
    description: 'Bid for the ownership of Nana bot for one month',
    execute(message, args, collection)
    {
        if (!args.length === 1 || args[0].match(/^\d*$/g)){
            message.reply("You didn't write a valid number");
        }

        collection.find(query).toArray(async function (err, result) {
            if (result === undefined || result.length === 0)
            {
                result = [{discordid: message.author.id, balance: 50, lastwork: null}];
                await collection.insertOne(result[0]);
            }

            let balance = result[0].balance;
            if (balance < args[0])
            {
                message.channel.send(`Uhh.. sorry ${message.author.username} you have only **${balance}¥**. Your offer is rejected.`);
                return;
            }

            //TODO: validate if the user did the highest bid. if not the highest bid, cancel            

            try{            
                await collection.updateOne(
                    {discordid: message.author.id},
                    {$set: {balance: (balance - args[0])}});
            } catch (e)  {
                console.log(e);
            }
        });
    }
};
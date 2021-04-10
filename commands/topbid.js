module.exports = {
    name: 'topbid',
    description: 'Returns the current highest bid for Nana',
    execute(message, args, collection)
    {
        let query = {discordid: message.author.id};
        //TODO: Read bidding DB, order desc by bid and select top
        // collection.find(query).toArray(async function (err, result)
        // {
        //     try
        //     {
        //         await collection.updateOne(
        //             {discordid: message.author.id},
        //             {$set: {balance: (result[0].balance - args[0])}});
        //     } catch (e)
        //     {
        //         console.log(e);
        //     }
        // });
    }
};
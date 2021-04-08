module.exports = {
    name: 'hi',
    aliases: ['hey', 'hello', 'sup', 'hi'],
    description: 'greeting',
    execute(message, args)
    {
        let replies = ["Hi.", "Hello.", "...", "Hii~", "Welcome home, my filthy master!", "Okaeri!", "Irasshaimase!", "Look who's back...Welcome home Dame-Master-Kun", "Oh no, the reason why this channel is so inactive is back", "Welcome back, my friend Kukur posted more lewds... maybe you can visit the nsfw channel to get some inspiration for tonight...", "Look who's back...a lost lamb looking to be dominated again...", "Oh... did your girlfriend deny you again so you're coming back to pay for love again....", "I love whisper lewd stuff in my Masters ears...so they come back, again and again... just like you...my filthy little master", "It looks like you're excited to see me my filthy master"];
        let result = Math.floor((Math.random() * replies.length));
        if (!args[0]) return message.channel.send(replies[result]);
    }
}
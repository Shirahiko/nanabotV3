module.exports = {
    name: 'kick',
    description: 'Small chance to kick yourself',
    execute(message, args)
    {
        if (message.channel.type === 'dm') {
            return message.reply('I can\'t execute that command inside DMs!');
        }

        let result = Math.floor((Math.random() * 1000));
        if(result = 1000){            
            return message.member.kick()
            .then(() => console.log(`${message.member.displayName} just kicked himself by accident! Oh no...`))
            .catch(console.error);
        }else{
            return message.channel.send("Did you just try to kick someone??? You got lucky that you didn't kick yourself! Better be careful.");
        }        
    }
}
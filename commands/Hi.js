module.exports = {
    name: 'hi',
    aliases: ['hey', 'hello', 'sup','hi'],
	description: 'greeting',
    execute(message, args){   
        let replies = ["Hi.", "Hello." , "...", "Hii~", "Welcome home, master!"];
        let result = Math.floor((Math.random() * replies.length));
        if(!args[0]) return message.channel.send(replies[result]);
    }
}
module.exports = {
    name: 'loveadvice',
    description: 'Random love advice',
    execute(message, args)
    {
        let replies = ["Love is like a hurricane.", 
            "Just ask her/him, they can only say no. Right?", 
            "Has the other person money?", 
            "Go on a date and get to know each other.", 
            "Do I look like google? BAKA"]
        let result = Math.floor((Math.random() * replies.length));

        message.channel.send(replies[result]);
    }
}
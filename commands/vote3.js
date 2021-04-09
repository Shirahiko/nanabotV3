module.exports = {
    name: 'vote3',
    description: 'Creates a voting with yes/no/maybe answer',
    execute(message, args)
    {
        let channel = message.channel;
        message.delete();
        channel.send(args.join(' '))
            .then(function (newMessage) {
                newMessage.react("👍")
                newMessage.react("👎")
                newMessage.react("🤔")
            });
    }
}
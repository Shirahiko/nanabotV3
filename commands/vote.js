module.exports = {
    name: 'vote2',
    description: 'Creates a voting with yes/no answer',
    execute(message, args)
    {
        message.channel.send(args.join(' '))
            .then(function (message) {
                message.react("👍")
                message.react("👎")
            });
    }
}

module.exports = {
    name: 'vote3',
    description: 'Creates a voting with yes/no/maybe answer',
    execute(message, args)
    {
        message.channel.send(args.join(' '))
            .then(function (message) {
                message.react("👍")
                message.react("👎")
                message.react("🤔")
            });
    }
}
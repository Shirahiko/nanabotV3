module.exports = {
    name: 'question:',
    aliases: ['q', 'question'],
    description: 'question:',
    execute(message, args)
    {
        if (!args[2]) return message.reply("Is that supposed to be a question?");
        let replies = ["Maybe~.", "Ewww.", "Do you really think a person bad equipped as you should be asking this?", "You must be one of these masochists...", "You must love being denied, don't you?", "I'd say my feet in your croch would be the right answer... I bet you'd like this", "My Bat's ready to knock you out Master!", "I bet you'd love to know that...but first... a filthy master like you, has to pay up first ¥¥¥", "eeeee That's what you're wasting your braincells with?", "I'd do it for 100.000¥", "Not relevant... just like your main character trade my filthy master", "Oh it's bigger than i thou... Please, what did you say?", "No questions tonight, no judging, just...you...me...and my only real master zest",  "I can't stop drooling over Shirahikos belly button.... Sorry, did you say something?", "Next please..."]

        let result = Math.floor((Math.random() * replies.length));
        //let question = args.slice(1).join("");

        message.channel.send(replies[result]);
    }
}
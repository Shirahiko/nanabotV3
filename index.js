const fs = require('fs');
const db = require('quick.db')
const Discord = require('discord.js');
const {prefix} = require('./config.json');
const cooldowns = new Discord.Collection();
const MongoClient = require('mongodb').MongoClient;
const autoRoles = require('./discord functions/autoRoles');
const uri = "mongodb://nana:" + process.env.password + "@localhost/nanabot?retryWrites=true";
const mongo = new MongoClient(uri, {useNewUrlParser: true});
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands.set(autoRoles.name, autoRoles);

for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

mongo.connect(err =>
{
    const collection = mongo.db("nanabot").collection("user");
    client.once('ready', () =>
    {
        //second (optional), minute, hour, day of month, month, day of week
        let biddingJob = new cron.CronJob('* * 1 * *', () => {
            let nanaMasterRoleId = '830515786136158238';
            let guild = client.guilds.get("510220836406558723");

            //Remove the old Master of Nana
            guild.roles.get(nanaMasterRoleId).members[0].removeRole(nanaMasterRoleId); 
            //TODO: Add Role to new Master with ID from DB
            let newMaster = guild.members.cache.get('242642161810538496');
            newMaster.addRole(nanaMasterRoleId);
            //TODO: Reset DB with bidding values

            //Send Message of ownership to a channel
            let channel = guild.channels.get('635456635120386049'); //bot channel
            channel.send(`${newMaster} is now my new Master for this month!`);
        });
        
        biddingJob.start();

        client.user.setActivity("at the café", {
            type: 'PLAYING',
            url: 'https://www.youtube.com/channel/UCAo6nC6I9yk2X4xqQThhhew'
        });
        console.log('Ready!')
    });

    client.on("guildMemberAdd", member =>
    {    
        const welcomeChannelId = '510220836913938445';
        const rulesChannelId = '510224463271297039';
        const startBalance = "As a welcome gift, I have added 50¥ to your wallet. Spend it wisely.";
     
        const messageArray = [`Welcome <@${member.id}> to the server! Please check out ${member.guild.channels.cache.get(rulesChannelId).toString()}. ${startBalance}`];        
        const channel = member.build.channels.cache.get(welcomeChannelId);
        let result = Math.floor((Math.random() * messageArray.length));
        channel.send(messageArray[result]);
    });

    client.on('message', message =>
    {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.args && !args.length)
        {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        if (!cooldowns.has(command.name))
        {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown) * 1000;

        if (timestamps.has(message.author.id))
        {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime)
            {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Stop requesting me so often! Wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.💢`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try
        {
            command.execute(message, args, collection);
        } catch (error)
        {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    });
     
    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id == channel) {
            switch (reaction.emoji.name) {
                case autoRoles.livestreamEmoji:
                    await reaction.message.guild.members.cache.get(user.id).roles.add(autoRoles.liveRole);
                    break;
                case autoRoles.videoEmoji:
                    await reaction.message.guild.members.cache.get(user.id).roles.add(autoRoles.videoRole);
                    break;
                case autoRoles.generalAnnouncementEmoji:
                    await reaction.message.guild.members.cache.get(user.id).roles.add(autoRoles.generalRole);
                    break;
                case autoRoles.serverAnnouncementEmoji:
                    await reaction.message.guild.members.cache.get(user.id).roles.add(autoRoles.serverRole);
                    break;
                default:
                    break;
            }
        } else {
            return;
        } 
    });

    client.on('messageReactionRemove', async (reaction, user) => { 
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return; 

        if (reaction.message.channel.id == channel) {
            switch (reaction.emoji.name) {
                case autoRoles.livestreamEmoji:
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(autoRoles.liveRole);
                    break;
                case autoRoles.videoEmoji:
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(autoRoles.videoRole);
                    break;
                case autoRoles.generalAnnouncementEmoji:
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(autoRoles.generalRole);
                    break;
                case autoRoles.serverAnnouncementEmoji:
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(autoRoles.serverRole);
                    break;
                default:
                    break;
            }
        } else {
            return;
        }
    });
});

client.login(process.env.token);
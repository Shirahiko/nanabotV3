const videoRole = message.guild.roles.cache.find(role => role.name === "video-update");
const generalRole = message.guild.roles.cache.find(role => role.name === "general-update");
const liveRole = message.guild.roles.cache.find(role => role.name === "live-update");
const serverRole = message.guild.roles.cache.find(role => role.name === "server-update");

const livestreamEmoji = '🖥️';
const videoEmoji = '🎬';
const generalAnnouncementEmoji = '📣';
const serverAnnouncementEmoji = '💾';

module.exports = {
    name: 'reactionrole',
    description: 'Creates reaction roles message',
    async execute(message, args) {
        //TODO: what happens with updates and adding more roles, but u dont want to reset the counter on reactions? write an extra update command?  
        //TODO: this file is another folder and needs to be added/loaded in index.js      
        if(!message.member.guild.me.hasPermission('ADMINISTRATOR')){
            return;
        }

        const channel = '510224463271297039';
 
        let message = `Please select on what events you want to be pinged: \n\n `
            + `${livestreamEmoji} Live Streams\n`
            + `${videoEmoji} New Videos\n`
            + `${generalAnnouncementEmoji} General Announcements\n`
            + `${serverAnnouncementEmoji} Server Announcements\n`;
 
        let roleMessage = await message.channel.send(message);
        roleMessage.react(livestreamEmoji);
        roleMessage.react(videoEmoji);
        roleMessage.react(generalAnnouncementEmoji);
        roleMessage.react(serverAnnouncementEmoji);
    }
}
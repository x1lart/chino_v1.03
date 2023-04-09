const { Message } = require('discord.js')


module.exports.run = async (client, message, args) => {
    /**
     * @param {Message} message
     */
     if (!message.member.roles.cache.some(role => role.name == "Moderator")) 
        return message.channel.send("No perms"),
        message.react('<:gg:1024258035771772958>')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Member not found')
        message.react('<:gg:1024258035771772958>')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`${Member.displayName} is now unmuted`)
        message.react('<:UA_AnimeHeart:1024353421605740556>')
    }
    module.exports.name = "unmute";
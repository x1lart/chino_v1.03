const { userMention } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, message, args, argsF) => {
    if (!message.member.roles.cache.some((role) => role.id == '1010946589658988636'))
        return message.channel.send("No perms"),
            message.react('<:gg:1024258035771772958>')
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member)
        return message.channel.send(`Please mention a user`),
        message.react('<:gg:1024258035771772958>')
        if(member === message.member)
        return message.channel.send(`You cannot ban yourself`),
        message.react('<:gg:1024258035771772958>')
        if(member.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send(`You cannot ban someone with an equal or higher role`),
        message.react('<:gg:1024258035771772958>')
        if(!member.bannable)
        return message.channel.send(`Provided member is not bannable`),
        message.react('<:gg:1024258035771772958>')
        let reason = args.slice(1).join(' ');
        if(!reason) reason = '`None`';
        if(reason.length > 1024) reason = reason.slice(0, 1024) + '...';
        await member.ban({ reason: reason });
        const embed = new MessageEmbed()
        .setTitle('Ban Member')
        .setDescription(`${member} was successfully banned.`)
        .addField('Reason', `${reason}`)
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RED');
        const embed2 = new MessageEmbed()
        .setTitle('You were banned on Xi`s server')
        .addField('Reason', `${reason}`)
        .setTimestamp()
        .setColor('RED');        
        message.channel.send({ embeds: [embed] }),
        message.react('<:UA_AnimeHeart:1024353421605740556>')
        
    }
    module.exports.name = "ban";
const Discord = require("discord.js")
module.exports.run = (client, message, args) => {
    if (!message.member.roles.cache.some((role) => role.id == '1010946589658988636'))
        return message.channel.send("No perms"),
            message.react('<:gg:1024258035771772958>')

    const target = message.mentions.users.first();
    const embed = new Discord.MessageEmbed()
          .setTitle(`НГou were kicked`)
          .setDescription("You were kicked from xi's server, probably you broke the rules")
          .setColor('BLUE')
        target.send({ embeds: [embed] })
    if (!target) return message.channel.send("Please mention a user"),
        message.react('<:gg:1024258035771772958>')
    if (target) {
        const memberTarget = message.guild.members.cache.get(target.id);
        
        memberTarget.kick();
        message.channel.send("User has been kicked"),
            message.react('<:UA_AnimeHeart:1024353421605740556>')
    } else {
        message.channel.send("Something went wrong")
        
    }

}







module.exports.name = "kick";

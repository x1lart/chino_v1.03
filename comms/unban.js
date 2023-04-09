const { MessageEmbed } = require('discord.js');
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports.run = async (client, message, args, argsF) => {
          try {
            if (!message.member.roles.cache.some(role => role.name == "Moderator")) 
        return message.channel.send("No perms"),
        message.react('<:gg:1024258035771772958>')
              const id = args[0];
              if(!rgx.test(id))
              return message.channel.send(`Please provide a valid user ID`),
              message.react('<:gg:1024258035771772958>')
              const bannedUsers = await message.guild.bans.fetch();
              const user = bannedUsers.get(id).user;
              if(!user)
              return message.channel.send(`Unable to find user, please check the provided ID valid`),
              message.react('<:gg:1024258035771772958>')

              await message.guild.members.unban(user)
              const embed = new MessageEmbed()
              .setTitle('Ban Member')
              .setDescription(`${user.tag} was successfully unbanned.`)
              .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
              .setTimestamp()
              .setColor('GREEN');
              message.channel.send({ embeds: [embed] }),
              message.react('<:UA_AnimeHeart:1024353421605740556>')

         } catch (err) {
             console.log(err)
         }
    }
    module.exports.name = "unban";
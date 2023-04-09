const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');
exports.run = (client, message, args) => {

    const mod = new Discord.MessageEmbed()
    .setTitle(`Chino Commands`)
    .setDescription(`**My Prefix is -**`)
    .setFooter('Total commands: 21')
    .setColor('BLUE')
    .setFields(
        { name: "Music", value: "**play\nskip\nstop\nqueue\nloop\nvolume\nbassboost\nboff\npause\nresume**", inline: true},
        { name: "Moderation", value: "**mute\nunmute\nkick\nban\nunban\ndel\nwhois**", inline: true},
        { name: "Fun", value: "**ask\navatar\ndicksize\nsay**", inline: true}
    )
    message.channel.send({ embeds: [mod] })
    message.react('<:UA_AnimeHeart:1024353421605740556>')
}
exports.name = "help"
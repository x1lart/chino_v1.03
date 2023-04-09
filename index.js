const Discord = require('discord.js');
const prefix = '-';
const { Client, Intents, Collection } = require('discord.js');
const fs = require("fs")
const client = new Client({
  partials: ['USER', 'REACTION', 'MESSAGE'],
  intents:
    [
      "GUILD_MESSAGE_REACTIONS",
      "GUILDS",
      "GUILD_MESSAGES",
      "GUILD_VOICE_STATES",
      "GUILD_MEMBERS"
    ],
    
  allowedMentions: ["users"]
});
const {
  MessageEmbed
} = require('discord.js');

client.on('guildMemberAdd', guildMember=> {
  let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member')
  const tw = new Discord.MessageEmbed()
    .setTitle(`**Welcome ${guildMember.user.tag}**`)
    .setDescription(`**Read the rules, before chatting**`)
    .setImage(guildMember.displayAvatarURL)
    .setColor('BLUE')

  guildMember.roles.add(welcomeRole)
  guildMember.guild.channels.cache.get('1010943059665629359').send({ embeds: [tw] })

})






client.commands = new Discord.Collection();
['command_handler',].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord);
})
client.on("messageCreate", message => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    command.run(client, message, args)
  }
})

client.on("ready", async(reaction) => {
  var guildx = client.guilds.cache.get("1010942860352294943",); //Test serverID
  await guildx.channels.cache.get("1026961003449172068").fetch({limit: 50})

  console.log("i'm here")
  client.user.setActivity('-help', { type: 'STREAMING' })
})

client.on('messageCreate', message => {
  if (message.content === "slava") {
    message.reply(`Ukraini!`)
  }
})
client.on('messageCreate', message => {
  if (message.content === "Slava") {
    message.reply(`Ukraini!`)
  }
})
client.on('messageCreate', message => {
  if (message.content === "Ярик") {
    message.reply(`Гей`)
  }
})





client.login("removed")
const logs = require('discord-logs');
logs(client, {
  debug: true
});

client.on("voiceChannelJoin", (member, channel) => {

  const LogChannel = client.channels.cache.get('1012590736631410688'); // Replace with your channel id
  const VCJoined = new MessageEmbed()
    .setTitle('Voice Channel Joined')
    .setColor('#2F3136')
    .setDescription(member.user.tag + " joined " + `${channel}` + "!");

  return LogChannel.send({
    embeds: [VCJoined]
  });

})


client.on("voiceChannelLeave", (member, channel) => {

  const LogChannel = client.channels.cache.get('1012590736631410688'); // Replace with your channel id
  const VCLeft = new MessageEmbed()
    .setTitle('Voice Channel Left')
    .setColor('#2F3136')
    .setDescription(member.user.tag + " left " + `${channel}` + "!");

  return LogChannel.send({
    embeds: [VCLeft]
  });

})

// VC Switch
client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {

  const LogChannel = client.channels.cache.get('1012590736631410688'); // Replace with your channel id
  const VCSwitch = new MessageEmbed()
    .setTitle('Voice Channel Switched')
    .setColor('#2F3136')
    .setDescription(member.user.tag + " left " + oldChannel.name + " and joined " + newChannel.name + "!");

  return LogChannel.send({
    embeds: [VCSwitch]
  });

})




const Distube = require('distube').default
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const distube = new Distube(client, {
  emitNewSongOnly: true,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  savePreviousSongs: true,
  searchSongs: 0,
  searchCooldown: 0,
  nsfw: true,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ],
  youtubeDL: false
})
client.on('messageCreate', message => {
  if (message.author.bot || !message.guild) return
  if (message.content.startsWith(prefix)) {
    let args = message.conternt.slice(prefix.length).trim().split(/ +/)
    let cmd = args.shift().toLowerCase()
  
  

  const elev = new Discord.MessageEmbed()
    .setTitle(`**<:sadtro:1011227632538484746> Please Join a Voice Channel**`)
    .setColor('BLUE')

    const gg = new Discord.MessageEmbed()
    .setTitle(`**<:sadtro:1011227632538484746> Please Provide a Song Name or Link**`)
    .setColor('BLUE')

  const twl = new Discord.MessageEmbed()
    .setTitle(`**<:sadtro:1011227632538484746> Nothing Playing Right Now**`)
    .setColor('BLUE')

  const thr = new Discord.MessageEmbed()
    .setTitle(`**<:sadtro:1011227632538484746> Song is Already Paused**`)
    .setColor('BLUE')

  const fur = new Discord.MessageEmbed()
    .setTitle(`**<:sadtro:1011227632538484746> Provide the Volume**`)
    .setColor('BLUE')
  const fif = new Discord.MessageEmbed()
    .setTitle(`**<:sadtro:1011227632538484746> Song is Already Playing**`)
    .setColor('BLUE')

  const sev = new Discord.MessageEmbed()
    .setTitle(`**<:sadtro:1011227632538484746> U Can Not Change the Volume by More Than 100**`)
    .setColor('BLUE')

  let queue = distube.getQueue(message)
  switch (cmd) {
    case "play": {
      let song = args.join(" ")
      let voiceChannel = message.member.voice.channel
      if (!voiceChannel) {
        return message.reply({ embeds: [elev] })
      } else if (!song) {
        return message.reply({ embeds: [gg] })
      } else {
        distube.play(voiceChannel, song, {
          member: message.member,
          message: message,
          textChannel: message.channel,
        })
        const two = new Discord.MessageEmbed()
          .setTitle(`**✅ Song Added To Queue**`)
          .setColor('BLUE')
        message.channel.send({ embeds: [two] })

      }
    } break;
    case "skip": {
      let voiceChannel = message.member.voice.channel
      if (!queue.autoplay && queue.songs.length <= 1) return message.reply(`**<:sadtro:1011227632538484746> Queue Has Only One Song, Instead Use "-stop"**`)
      if (!voiceChannel) {
        return message.reply({ embeds: [elev] })
      } else if (!queue) {
        return message.reply({ embeds: [twl] })
      } else {
        queue.skip().then(s => {
          const three = new Discord.MessageEmbed()
            .setTitle(`**✅ Song Skipped**`)
            .setColor('BLUE')
          message.channel.send({ embeds: [three] })
        })

      }
    } break;
    case "stop": {
      let voiceChannel = message.member.voice.channel
      if (!voiceChannel) {
        return message.reply({ embeds: [elev] })
      } else if (!queue) {
        return message.reply({ embeds: [twl] })
      } else {
        queue.stop().then(s => {
          const four = new Discord.MessageEmbed()
            .setTitle(`**✅ Queue Stopped**`)
            .setColor('BLUE')
          message.channel.send({ embeds: [four] })
        })
      }
    } break;
    case "loop": {
      let voiceChannel = message.member.voice.channel
      let loopmode = args[0]
      let mods = ["song", "queue", "off"]
      const six = new Discord.MessageEmbed()
        .setTitle(`**<:sadtro:1011227632538484746> Wrong Usage \n > ${mods.join(" , ")}**`)
        .setColor('BLUE')
      const seven = new Discord.MessageEmbed()
        .setTitle(`**✅ Loopmode Set to "song"**`)
        .setColor('BLUE')
      const eight = new Discord.MessageEmbed()
        .setTitle(`**✅ Loopmode Set to "queue"**`)
        .setColor('BLUE')
      const nine = new Discord.MessageEmbed()
        .setTitle(`**✅ Loopmode Off**`)
        .setColor('BLUE')
      if (!voiceChannel) {
        return message.reply({ embeds: [elev] })
      } else if (!queue) {
        return message.reply({ embeds: [twl] })
      } else if (!mods.includes(loopmode)) {
        return message.channel.send({ embeds: [six] })

      } else {
        if (loopmode === "song") {
          queue.setRepeatMode(1)
          message.channel.send({ embeds: [seven] })

        } else if (loopmode === "queue") {
          queue.setRepeatMode(2)
          message.channel.send({ embeds: [eight] })
        } else if (loopmode === "off") {
          queue.setRepeatMode(0)
          message.channel.send({ embeds: [nine] })
        }
      }
    } break;


    case "pause": {
      let voiceChannel = message.member.voice.channel
      if (!voiceChannel) {
        return message.reply({ embeds: [elev] })
      } else if (!queue) {
        return message.reply({ embeds: [twl] })
      } else if (queue.paused) {
        return message.reply({ embeds: [thr] })
      } else {
        queue.pause()
        const four = new Discord.MessageEmbed()
          .setTitle(`**✅ Song Paused**`)
          .setColor('BLUE')
        message.channel.send({ embeds: [four] })

      }
    } break;
    case "volume": {
      let voiceChannel = message.member.voice.channel
      let volume = Number(args[0])

      if (!voiceChannel) {
        return message.reply({ embeds: [elev] })
      } else if (!queue) {
        return message.reply({ embeds: [twl] })
      } else if (!volume) {
        return message.reply({ embeds: [fur] })
      } else if (volume > 100) {
        return message.reply({ embeds: [sev] })
      } else {
        queue.setVolume(volume)
        const ten = new Discord.MessageEmbed()
          .setTitle(`**✅ Volume Changed to \`${queue.volume}%\`**`)
          .setColor('BLUE')
        message.channel.send({ embeds: [ten] })

      }
    } break;
    case "bassboost": {
      let voiceChannel = message.member.voice.channel


      if (!voiceChannel) {
        return message.reply({ embeds: [elev] })
      } else if (!queue) {
        return message.reply({ embeds: [twl] })
      } else {
        queue.setVolume(10000000)
        const sic = new Discord.MessageEmbed()
          .setTitle(`**✅ BOOSTED**`)
          .setColor('BLUE')
        message.channel.send({ embeds: [sic] })

      }
    } break;
    case "boff": {
      let voiceChannel = message.member.voice.channel
      if (!voiceChannel) {
        return message.reply({ embeds: [elev] })
      } else if (!queue) {
        return message.reply({ embeds: [twl] })
      } else {
        queue.setVolume(100)
        const sic = new Discord.MessageEmbed()
          .setTitle(`**✅ UNBOOSTED**`)
          .setColor('BLUE')
        message.channel.send({ embeds: [sic] })

      }
    } break;
    case "resume": {
      let voiceChannel = message.member.voice.channel
      if (!voiceChannel) {
        return message.reply({ embeds: [elev] })
      } else if (!queue) {
        return message.reply({ embeds: [twl] })
      } else if (queue.resumed) {
        return message.reply({ embeds: [fif] })
      } else {
        queue.resume()
        const five = new Discord.MessageEmbed()
          .setTitle(`**✅ Song Resumed**`)
          .setColor('BLUE')
        message.channel.send({ embeds: [five] })

      }
    } break;
    case "queue": {
      let voiceChannel = message.member.voice.channel
      if (!voiceChannel) {
        return message.reply({ embeds: [elev] })
      } else if (!queue) {
        return message.reply({ embeds: [twl] })
      } else {
        let songs = queue.songs.slice(0, 100).map((song, index) => {
          return `\`${index + 1}\` [\`${song.name}\`](${song.url}) [${song.formattedDuration}]`

        }).join('\n')
        message.reply({
          embeds: [new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`Current Queue`)
            .setDescription(songs)]
        })

      }
    } break;

    default:
      break;


  }

  distube.on('playSong', async (queue, song, addSong) => {
    if (!addSong) return
    queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("BLUE")
          .setTitle(`Now Playing💿`)
          .setDescription(` [\`${song.name}\`](${song.url}) [${song.user}] `)
      ]
    })
  })
}})

let conversation = [];

const cleverbot = require("cleverbot-free");
client.on('messageCreate', (message) => {
  if (message.author.bot) return false;
  if (message.mentions.has(client.user.id)) {
    let text = message.content
    text = text.substring(text.indexOf(">") + 2, text.length)

    cleverbot(text, conversation).then((res) => {
      conversation.push(text)
      conversation.push(res)
      message.channel.send(res)
    })
  }
})

//client.on("ready", (message) => {
//const games = new MessageEmbed()
// .setTitle('Games & Other')
 //.setColor('BLUE')
 //.setDescription('1️⃣ - Dota 2\n\n2️⃣ - CS:GO\n\n 3️⃣ - League of Legends\n\n 4️⃣ - Fortnite\n\n 5️⃣ - World of Tanks\n\n 6️⃣ - Ableton\n\n 7️⃣ - FL Studio\n\n 8️⃣ - VS Code ')

 //message.channels.cache.get('1026961003449172068').send({ embeds: [games] })
//})
 

client.on('messageReactionAdd', async(reaction, user) => {
  
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch();
  if(user.bot) return;
  if(!reaction.message.guild) return;
  if(reaction.message.id === '1027646129761947710')

  {
      if(reaction.emoji.name === '💿') {
          await reaction.message.guild.members.cache.get(user.id).roles.add('1027107165258915840')

      }
      if(reaction.emoji.name === '🖌️') {
        await reaction.message.guild.members.cache.get(user.id).roles.add('1027629231468990494')
 
    }
    if(reaction.emoji.name === '🎮') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('1027629849877151815')
      
  }
  }

  if(reaction.message.id === '1027657904507080725')
  {
      if(reaction.emoji.name === '1️⃣') {
          await reaction.message.guild.members.cache.get(user.id).roles.add('1027650964552953946')

      }
      if(reaction.emoji.name === '2️⃣') {
        await reaction.message.guild.members.cache.get(user.id).roles.add('1027651079787262023')
 
    }
    if(reaction.emoji.name === '3️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('1027651181457186847')
      
  }
  if(reaction.emoji.name === '4️⃣') {
    await reaction.message.guild.members.cache.get(user.id).roles.add('1027651276005191700')
    
}
if(reaction.emoji.name === '5️⃣') {
  await reaction.message.guild.members.cache.get(user.id).roles.add('1027651413158936668')
  
}
if(reaction.emoji.name === '6️⃣') {
  await reaction.message.guild.members.cache.get(user.id).roles.add('1027651494935277578')
  
}
if(reaction.emoji.name === '7️⃣') {
  await reaction.message.guild.members.cache.get(user.id).roles.add('1027651868198965298')
  
}
if(reaction.emoji.name === '8️⃣') {
  await reaction.message.guild.members.cache.get(user.id).roles.add('1027651508717760582')
  
}
  }
  
})
client.on('messageReactionRemove', async(reaction, user) => {
  
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch();
  if(user.bot) return;
  if(!reaction.message.guild) return;
  if(reaction.message.id === '1027646129761947710')

  {
      if(reaction.emoji.name === '💿') {
          await reaction.message.guild.members.cache.get(user.id).roles.remove('1027107165258915840')

      }
      if(reaction.emoji.name === '🖌️') {
        await reaction.message.guild.members.cache.get(user.id).roles.remove('1027629231468990494')
 
    }
    if(reaction.emoji.name === '🎮') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('1027629849877151815')
      
  }
  }
  if(reaction.message.id === '1027657904507080725')
  {
      if(reaction.emoji.name === '1️⃣') {
          await reaction.message.guild.members.cache.get(user.id).roles.remove('1027650964552953946')

      }
      if(reaction.emoji.name === '2️⃣') {
        await reaction.message.guild.members.cache.get(user.id).roles.remove('1027651079787262023')
 
    }
    if(reaction.emoji.name === '3️⃣') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('1027651181457186847')
      
  }
  if(reaction.emoji.name === '4️⃣') {
    await reaction.message.guild.members.cache.get(user.id).roles.remove('1027651276005191700')
    
}
if(reaction.emoji.name === '5️⃣') {
  await reaction.message.guild.members.cache.get(user.id).roles.remove('1027651413158936668')
  
}
if(reaction.emoji.name === '6️⃣') {
  await reaction.message.guild.members.cache.get(user.id).roles.remove('1027651494935277578')
  
}
if(reaction.emoji.name === '7️⃣') {
  await reaction.message.guild.members.cache.get(user.id).roles.remove('1027651868198965298')
  
}
if(reaction.emoji.name === '8️⃣') {
  await reaction.message.guild.members.cache.get(user.id).roles.remove('1027651508717760582')
}
}
  })





const Discord = require('discord.js')


module.exports.run = async (client, message, args) => {

	if(!args[0]) return message.reply("Please ask a full question!")
	if(args[0].length < 1) return message.reply("Please ask a full question!")
	
	let i = [
		'It is certain.',
				'It is decidedly so.',
				'Without a doubt.',
				'Yes definitely.',
				'You may rely on it.',
				'As I see it, yes.',
				'Most likely.',
				'Outlook good.',
				'Yes.',
				'Signs point to yes.',
				'Reply hazy try again.',
				'Ask again later.',
				'Better not tell you now.',
				'Cannot predict now.',
				'Concentrate and ask again.',
				'Don\'t count on it.',
				'My reply is no.',
				'My sources say no.',
				'Outlook not so good.',
				'Very doubtful.',
				'No way.',
				'Maybe',
				'The answer is hiding inside you',
				'No.',
				'Depends on the mood of the CS god',
				'||No||',
				'||Yes||',
				'Hang on',
				'It\'s over',
				'It\'s just the beginning',
				'Good Luck',
	]

	let y = i[Math.floor(i.length * Math.random())]

	message.reply(`${y}`)
	message.react('<:UA_AnimeHeart:1024353421605740556>')
}
module.exports.name = "ask";
const Discord = require('discord.js')


module.exports.run = async (client, message, args) => {
	let i = [
    "1 cm", "2 cm", "3 cm", "4 cm", "5 cm", "6 cm", "7 cm", "8 cm", "9 cm", "10 cm", "11 cm", "12 cm", "13 cm", "14 cm", "15 cm", "16 cm", "17 cm","18 cm", "19 cm", "20 cm",
    "21 cm", "22 cm", "23 cm", "24 cm", "25 cm", "26 cm", "27 cm", "28 cm", "29 cm", "30 cm", "99 cm"

	]

	let y = i[Math.floor(i.length * Math.random())]

	message.reply(`${y}`)
    message.react('<:UA_AnimeHeart:1024353421605740556>')
}
module.exports.name = "dicksize";
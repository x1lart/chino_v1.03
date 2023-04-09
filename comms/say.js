exports.run = (client, message, args) => {
let toSay = args.join(" ")
if(!toSay) return message.reply({content:"Type message u want me to say!"})
message.channel.send({content: toSay})
message.delete({content: toSay})
}
exports.name = "say"
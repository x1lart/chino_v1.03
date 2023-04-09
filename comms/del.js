

module.exports.run = async (client, message, args, member) => {
    

    if (!message.member.roles.cache.some(role => role.name == "Moderator")) 
        return message.channel.send("No perms"),
        message.react('<:gg:1024258035771772958>')

    
    let deleteCount = parseInt(args[0], 10)
    // Check if Delete Count is bigger than discord can handle
    if (deleteCount > 100) {
      // Delete only 100 messages
      deleteCount = 100
      // Notify user about this
      message.channel.send('I Can handle only 100 messages. Deleting 100 messages').then(e => setTimeout(() => e.delete(), 2000))
    }
    // Delete only one message if not specified how many
    if (Number.isNaN(deleteCount)) deleteCount = 2
      // Fetch messages
      const fetched = await message.channel.messages.fetch({ limit: deleteCount })
      // Delete messages
      await message.channel.bulkDelete(fetched)
    
  }
  exports.name = "del"
const fs = require('fs');

module.exports = {
  run: async (reaction, user) => {
    // When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) await reaction.fetch()
    if (user.bot) return
    if (!reaction.message.guild) return

    // Get rules channel and message information for rules interaction
    fs.readFile(__dirname + '../data/rules.txt', 'utf8', function (err, data) {
      let info = data.split('\n')
      if (reaction.message.id == info[0] && reaction.emoji.name == '👍') {
        reaction.message.guild.roles.fetch(info[1].substring(3, info[1].length - 1)).then(roleassigned => {
          reaction.message.guild.members.fetch(user.id).then(member => {
            member.roles.add(roleassigned)
            reaction.message.channel.send(`Thank you for reacting, ${user}. The role ${roleassigned} has been assigned to you!`)
          })
        })
      }
    })
  }
}

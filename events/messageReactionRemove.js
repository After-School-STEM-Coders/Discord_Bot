module.exports = {
  run: async (reaction, user) => {
    if (reaction.partial) await reaction.fetch()
    if (user.bot) return
    if (!reaction.message.guild) return

    fs.readFile(__dirname + '/data/rules.txt', 'utf8', function (err, data) {
      let info = data.split('\n')
      if (reaction.message.id == info[0] && reaction.emoji.name == '👍') {
        reaction.message.guild.roles.fetch(info[1].substring(3, info[1].length - 1)).then(roleassigned => {
          reaction.message.guild.members.fetch(user.id).then(member => {
            member.roles.remove(roleassigned)
            reaction.message.channel.send(`Hey ${user}, you deleted your reaction. The role ${roleassigned} has been removed!`)
          })
        })
      }
    })
  }
}

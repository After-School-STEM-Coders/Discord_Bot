const Discord = require('discord.js')

module.exports = {
  name: 'exp',
  description: 'this shows experience!',
  execute (message, args) {
    const image = message.author.avatarURL()
    const userName = message.author.username

    const experience = 290
    const level = Math.floor(Math.log2(experience / 100))
    const currentLevelExperience = Math.pow(2, level) * 100
    const playerLevelExperience = (experience - currentLevelExperience)
    const barPercentage = playerLevelExperience / (currentLevelExperience * 2)
    const numSquares = Math.floor(20 * barPercentage)

    let bar = ''

    for (let i = 0; i < 20; i++) {
      if (i < numSquares) {
        bar += '🟩'
      } else {
        bar += '⬜'
      }
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(userName + ' - Level ' + level, image)
      .setColor(0x0000ff)
      .addField(`${playerLevelExperience} / ${currentLevelExperience * 2} xp`, bar)

    message.channel.send(embed)
  }
}

const Discord = require('discord.js');
const {welcomeMessages} = require('../data/welcome')
let welcomeIndex = Math.floor(Math.random() * welcomeMessages.length)

module.exports = {
  run: async (oldMember, newMember) => {
    const welcomechannel = newMember.guild.channels.cache.find(ch => ch.name === '🧮-main-chat-🧮');
    const chooseroleschannel = newMember.guild.channels.cache.find(ch => ch.name === 'choose-your-roles');
    let oldRoles = new Set(oldMember._roles)
    let newRoles = new Set(newMember._roles)
    let new_minus_old = new Set([...newRoles].filter(x => !oldRoles.has(x))).values().next().value
    let welcomedroleid = oldMember.guild.roles.cache.find(i => i.name === "Welcomed").id;
    if (new_minus_old === welcomedroleid) {
      welcomechannel.send(welcomeMessages[welcomeIndex](newMember, chooseroleschannel));
      welcomeIndex = (welcomeIndex + 1) % (welcomeMessages.length+1);
    }
  }
}
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

    /*
 Eventual Goal:
                             +-------------------+           +--------------------------+
 +---------------------+     |Bot checks whether |           |Bot creates new group PM  |
 |New user joins server+---->+they have a brand  +--->New--->+message with new user and |
 +---------------------+     |new discord account|           |@Mods for special greeting|
           |                 +-------------------+           +--------------------------+
           |                         |                                     |
           |                         v                                     |
           |                      Not New                                  |
           |                         |                                     |
           v                         v                                     |
 +-----------------------+   +----------------+                            |
 |New user clicks Welcome|   |Bot welcomes the|                            |
 |emoji, gaining the     +-->+new user in     +<---------------------------+
 |"Welcomed" Role        |   |the main chat.  |
 +-----------------------+   +----------------+

Current implementation:

 +---------------------+
 |New user joins server+
 +---------------------+
           |
           |
           v
 +-----------------------+   +----------------+
 |New user clicks Welcome|   |Bot welcomes the|
 |emoji, gaining the     +-->+new user in     +
 |"Welcomed" Role        |   |the main chat.  |
 +-----------------------+   +----------------+

 */
  }
}
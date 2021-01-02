const fs = require('fs');

module.exports = {
  run: async (reaction, whoreacted) => {
    // When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) {
      // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message: ', error);
        // Return as `reaction.message.id` may be undefined/null
        return;
      }
    }
    if (reaction.message.id === "794773215444205588") { //change this ID to match special Welcome message
      let role = reaction.message.guild.roles.cache.find((role) => role.name === 'Welcomed')
      let guildmember = await reaction.message.guild.members.fetch(whoreacted.id)//.then(GuildMember => GuildMember)
      console.log(`Welcomed ${guildmember.user.username}`) // TODO: Change this to record DiscordID rather than username.
      guildmember.roles.add(role).then().catch(console.error)
    }

    const myarrays = reaction.message.reactions.cache.map(reaction => reaction.users.fetch())
    await Promise.all(myarrays).then((item => console.log(item)))
    console.log("success?")
  }
}
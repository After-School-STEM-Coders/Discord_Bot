const fs = require('fs');

module.exports = {
  run: async (reaction, whoreacted) => {
    //reaction is a MessageReaction class
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
    if (reaction.message.id === "794795306242801674") { //change this ID to match special Welcome message
      let role = reaction.message.guild.roles.cache.find((role) => role.name === 'Welcomed')
      let guildmember = await reaction.message.guild.members.fetch(whoreacted.id)//.then(GuildMember => GuildMember)
      console.log(`Welcomed ${guildmember.user.username}`) // TODO: Change this to record DiscordID rather than username.
      guildmember.roles.add(role).then().catch(console.error)
    }
    //reaction.message.reactions.cache
    //MessageReaction.Message.ReactionManager.Collection<(string|Snowflake), MessageReaction>

    //reaction => reaction.users.fetch
    //MessageReaction => MessageReaction.ReactionUserManager.Promise<Collection<Snowflake, User>>


  }
}
const prefix = '+' // prefix of commands feel free to change this
discordclient = global.discordclient

module.exports = {
  run: async (message) => {
    if ((message.mentions.members.size > 0) && (message.cleanContent.slice(-2) === "++")) {
      message.channel.send("One point for Gryffindor!");

      db.addexppoints(message.mentions.members.first().user.id, 1).then(points =>{

        message.channel.send(`${message.mentions.members.first().user.username} has ${points} points!`)

      })
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // Help Command!
    if (command == "help") {
      const helpcmd = require('../commands/utility/help')
      helpcmd.execute(message, discordclient.commands, args);
      return true;

    }

    // Help Command!
    if (command == "commands") {

      const commandscmd = require('../commands/utility/commands')
      commandscmd.execute(message, commandCategories, args);
      return true;

    }


    /// Command block begins here


    try {

      discordclient.commands.get(command).execute(message, args)

    }catch(err){
      console.log(err)

      message.reply("That command doesn't exist!")

    }

  }
}

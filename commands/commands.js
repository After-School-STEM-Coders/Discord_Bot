const Discord = require('discord.js');

module.exports = {
    name: 'commands',
    description: 'List all the commands available.',
    execute(message, commands, args){
            let embed = new Discord.MessageEmbed().setTitle("Commands").setColor(0x0000ff);

            /// Command block begins here
            commands.some(function(cmd) {
                
                embed.addField(cmd.name, cmd.description);

            });

            message.channel.send(embed);


    }
}
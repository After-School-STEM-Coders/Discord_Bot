const Discord = require('discord.js');

module.exports = {
    name: 'commands',
    description: 'List all the commands available.',
    execute(message, commands, args){

        let embed = new Discord.MessageEmbed()
        let found = false

        if (args.length == 0) {

            found = true
            
            embed.setTitle("Categories").setColor(0x0000ff);
            

            /// Command block begins here
            commands.forEach(cmd =>  {
                

                embed.addField(cmd.catName, cmd.catDescription);

            })

            

        }
        else
        {

            commands.forEach(cat => {
                

                if (args[0] == cat.catName){

                    found = true
                    embed.setTitle(cat.catName).setColor(0x0000ff).setDescription(cat.catDescription)

                    cat.catCommands.forEach(cmd =>  {
                        
                        embed.addField(cmd.name, cmd.description);
        
                    })

                }
                else {
                    cat.catCommands.forEach(cmd =>{
                        if (cmd.name == args[0]){
                            found = true
                            embed.setTitle(cmd.name).setColor(0x0000ff).setDescription(cmd.description)

                        }
                    })
                }

            })

        }

        if (found) {
            message.channel.send(embed)
        }
        else{
            message.reply("The command or category specified does not exist.")
        }
        


    }
}
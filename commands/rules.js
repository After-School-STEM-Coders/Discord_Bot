const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'rules',
    description: 'these are the rules!',
    execute(message, args){

        if (!args[0]) {
            message.reply("Correct usage is \"+rules @role\" with the welcoming role!");
            return;
        }
        else{

            const embed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle("Ackwowledgement")
            .setDescription(`By reacting to this message you agree to the rules of this server, and will be given the role of ${args[0]}!`);
            
        
            message.channel.send(embed).then(sentMessage => {
        
                sentMessage.react("👍");
    
                let id = sentMessage.id;
                let role = args[0];
                let info = id + "\n" + role;
    
                fs.writeFile(__dirname + '/../data/rules.txt', info, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                  });
        
            });
    

        }



    }
}
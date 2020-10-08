const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'rules',
    description: 'this rules!',
    execute(message, args){

        const embed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTitle("Rules")
        .setDescription("This is an **embeded** message")
        .addField("Rules 1", "This is rule 1")
        .addField("Rule 2", "This is rule 2")
        .addField("Rule 3", "This is rule 3")
        .addField("Rule 4", "this is rule 4");
        
    
        message.channel.send(embed).then(sentMessage => {
    
            sentMessage.react("👍");

            let id = sentMessage.id;
            let channel = sentMessage.channel;
            let info = channel + "\n" + id;

            fs.writeFile(__dirname + '/../data/rules.txt', info, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
              });
    
        });


    }
}
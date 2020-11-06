const Discord = require('discord.js');


module.exports = {
    name: 'roles',
    description: 'Displays all the roles on the server.',
    execute(message, args){

        message.guild.roles.fetch().then(roles => {

            let text = "";

            roles.cache.forEach(element => {
                text += `${element}\n`;
            });

            message.channel.send(text);
            

        });


    }
}
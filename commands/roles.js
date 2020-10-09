const Discord = require('discord.js');


module.exports = {
    name: 'roles',
    description: 'Displays all the roles on the server.',
    execute(message, args){

        message.guild.roles.fetch().then(roles => {

            roles.cache.forEach(element => {
                message.reply(`${element}`);
            });
            

        });


    }
}
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'exp',
    description: 'this shows experience!',
    execute(message, args){

        const image = message.author.avatarURL();
        const userName = message.author.username;

        let level = 1;
        let experience = 50;
        let nextLevelExperience = (level + 1) * 100
        let barPercentage =  experience / nextLevelExperience;
        let numSquares = Math.floor(20 * barPercentage);

        let bar = "";

        for (let i = 0; i < 20; i++)
        {
            if(i < numSquares) {
                bar += "O";
            }
            else{
                bar += ".";
            }
        }
        console.log(`${experience} / ${nextLevelExperience} xp`)
        console.log(bar)
        const embed = new Discord.MessageEmbed()
        .setAuthor(userName + " - Level " + level, image)
        .setColor(0x0000ff)
        .addField(`${experience} / ${nextLevelExperience} xp`, bar);
        
    
        message.channel.send(embed);


    }
}

const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'exp',
    description: 'this shows experience!',
    execute(message, args){

        const image = message.author.avatarURL();
        const userName = message.author.username;

        let experience = 290;
        let level = Math.floor( Math.log2(experience/100) );
        let currentLevelExperience = Math.pow(2, level) * 100;
        let playerLevelExperience = (experience - currentLevelExperience);
        let barPercentage =  playerLevelExperience / (currentLevelExperience * 2);
        let numSquares = Math.floor(20 * barPercentage);

        let bar = "";

        for (let i = 0; i < 20; i++)
        {
            if(i < numSquares) {
                bar += "🟩";
            }
            else{
                bar += "⬜";
            }
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor(userName + " - Level " + level, image)
        .setColor(0x0000ff)
        .addField(`${playerLevelExperience} / ${currentLevelExperience * 2} xp`, bar);
        
    
        message.channel.send(embed);


    }
}
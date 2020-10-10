const { info } = require('console');
const Discord = require('discord.js');
const fs = require('fs');


const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

/// prefix of commands feel free to change this
const prefix = '+'

//requiring path and fs modules
const path = require('path');

client.commands = new Discord.Collection();

//joining path of directory

const directoryPath = path.join(__dirname, 'commands');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);

        console.log(file);
    });
});





client.once('ready' , () => {

    console.log('Jarvis is Online!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // Help Command!
    if (command == "help") {
        const helpcmd = require('./commands/help')
        helpcmd.execute(message, client.commands, args);
        return true;

    }

        // Help Command!
    if (command == "commands") {
        
        const commandscmd = require('./commands/commands')
        commandscmd.execute(message, client.commands, args);
        return true;
    
    }


    /// Command block begins here
    client.commands.some(function(cmd) {

        if (command == cmd.name)
        {
            cmd.execute(message, args);
            return true;

        }
    });
        
});

    

client.on('messageReactionAdd', async (reaction, user) => {
    // When we receive a reaction we check if the reaction is partial or not

    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    // Get rules channel and message information for rules interaction
    fs.readFile(__dirname + '/data/rules.txt', 'utf8', function(err, data){

        let info = data.split('\n');
        
        if (reaction.message.id == info[0] && reaction.emoji.name == "👍")
        {
            reaction.message.guild.roles.fetch(info[1].substring(3, info[1].length - 1)).then(roleassigned => {

                reaction.message.guild.members.fetch(user.id).then(member => {

                    member.roles.add(roleassigned);
                    reaction.message.channel.send(`Thank you for reacting, ${user}. The role ${roleassigned} has been assigned to you!`);

                })
                

            });

            
        }
        

    }); 

});

client.on('messageReactionRemove', async (reaction, user) => {

    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    fs.readFile(__dirname + '/data/rules.txt', 'utf8', function(err, data){

        let info = data.split('\n');
        
        if (reaction.message.id == info[0] && reaction.emoji.name == "👍")
        {
            reaction.message.guild.roles.fetch(info[1].substring(3, info[1].length - 1)).then(roleassigned => {

                reaction.message.guild.members.fetch(user.id).then(member => {

                    member.roles.remove(roleassigned);
                    reaction.message.channel.send(`Hey ${user}, you deleted your reaction. The role ${roleassigned} has been removed!`);

                })
                

            });

            
        }
        

    }); 


});




const botToken = process.env.BARVIS
// console.log(bot_token);
client.login(botToken)

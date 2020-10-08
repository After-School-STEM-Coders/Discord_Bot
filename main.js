const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

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


    /// Command block begins here
    client.commands.some(function(cmd) {

        if (command == cmd.name)
        {
            cmd.execute(message);
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

        info = data.split('\n');
        
        if (reaction.message.channel == info[0] && reaction.message.id == info[1] && reaction.emoji.name == "👍")
        {
            reaction.message.channel.send(`Thank you for reacting, ${user}`);
        }


    }); 

});





client.login('NzYwODE5NDIxNjk4MDY0NDA0.X3RmTQ.H5AkPod_08zk5rDwji57ExT4ryM');

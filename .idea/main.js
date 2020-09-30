const Discord = require('discord.js');

const client = new Discord.Client();

/// prefix of commands feel free to change this
const prefix = '+'

//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory
const directoryPath = path.join('./Commands/', '/Discord_Bot/Commands');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
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
    if(command === 'ping'){
        message.channel.send('pong!');
    }else if (command == 'faq' || command == 'FAQ'){
        message.channel.send("To be or not to be that is the question, we should strive for the benefit of mankind")
    }
});





















client.login('NzYwODE5NDIxNjk4MDY0NDA0.X3RmTQ.H5AkPod_08zk5rDwji57ExT4ryM');

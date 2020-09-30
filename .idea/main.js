const Discord = require('discord.js');

const client = new Discord.Client();

/// prefix of commands feel free to change this
const prefix = '+'


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
        message.channel.send("")
    }
});





















client.login('NzYwODE5NDIxNjk4MDY0NDA0.X3RmTQ.H5AkPod_08zk5rDwji57ExT4ryM');

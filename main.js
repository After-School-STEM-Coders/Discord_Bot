const { info } = require('console');
const Discord = require('discord.js');
const {welcomeMessages} = require('./commands/welcome');
let welcomeIndex = Math.floor(Math.random() * welcomeMessages.length)
const fs = require('fs');
const {dbClient} = require('pg')
const util = require('util')

const discordclient = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

// environment variables for database access
const dbuser = process.env.DBUSER
const dbhost = process.env.DBHOST
const dbname = process.env.DBNAME
const dbpswd = process.env.DBPSWD
const dbport = process.env.DBPORT


/// prefix of commands feel free to change this
const prefix = '+'

// requiring path and fs modules
const path = require('path')

discordclient.commands = new Discord.Collection()

// joining path of directory

const directoryPath = path.join(__dirname, 'commands')
// passing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
// handling error
    if (err) {
    return console.log('Unable to scan directory: ' + err)
    }
  // listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file

    const command = require(`./commands/${file}`)
    if(typeof command.name !== "undefined") {
        discordclient.commands.set(command.name, command)
    }
  })
})






discordclient.once('ready' , () => {
    console.log('Jarvis is Online!');


});

discordclient.on('guildMemberAdd', member => {
    const dbClient = new dbClient({
        user: dbuser,
        host: dbhost,
        database: dbname,
        password: dbpswd,
        port: dbport
    })

    var query = "select * from ross.rosstable"

    module.exports = {
        name: 'testdbschema',
        description: 'Check if database schema exists.',
        execute(message, args){

            dbClient.connect()
            dbClient.query(query, (err, res) => {
                console.log(err, res)

                message.reply(res.rows[0].first_name)
                dbClient.end()
            })


        }
    }
});

/*
 Eventual Goal:
                             +-------------------+           +--------------------------+
 +---------------------+     |Bot checks whether |           |Bot creates new group PM  |
 |New user joins server+---->+they have a brand  +--->New--->+message with new user and |
 +---------------------+     |new discord account|           |@Mods for special greeting|
           |                 +-------------------+           +--------------------------+
           |                         |                                     |
           |                         v                                     |
           |                      Not New                                  |
           |                         |                                     |
           |                         |                                     |
           v                         v                                     |
 +-----------------------+   +----------------+                            |
 |New user clicks Welcome|   |Bot welcomes the|                            |
 |emoji, gaining the     +-->+new user in     +<---------------------------+
 |"Welcomed" Role        |   |the main chat.  |
 +-----------------------+   +----------------+

Current implementation:

 +---------------------+
 |New user joins server+
 +---------------------+
           |       
           |
           |
           |
           |
           |
           v
 +-----------------------+   +----------------+
 |New user clicks Welcome|   |Bot welcomes the|
 |emoji, gaining the     +-->+new user in     +
 |"Welcomed" Role        |   |the main chat.  |
 +-----------------------+   +----------------+

 */
discordclient.on('guildMemberUpdate', (oldMember, newMember) => {
    const welcomechannel = newMember.guild.channels.cache.find(ch => ch.name === '🧮-main-chat-🧮');
    const chooseroleschannel = newMember.guild.channels.cache.find(ch => ch.name === 'choose-your-roles');
    let oldRoles = new Set(oldMember._roles)
    let newRoles = new Set(newMember._roles)
    let new_minus_old = new Set([...newRoles].filter(x => !oldRoles.has(x))).values().next().value
    let welcomedroleid = oldMember.guild.roles.cache.find(i => i.name === "Welcomed").id;
    if (new_minus_old === welcomedroleid) {
        welcomechannel.send(welcomeMessages[welcomeIndex](newMember, chooseroleschannel));
        welcomeIndex = (welcomeIndex + 1) % (welcomeMessages.length+1);
    }
});

discordclient.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // Help Command!
    if (command == "help") {
        const helpcmd = require('./commands/help')
        helpcmd.execute(message, discordclient.commands, args);
        return true;

    }

        // Help Command!
    if (command == "commands") {
        
        const commandscmd = require('./commands/commands')
        commandscmd.execute(message, discordclient.commands, args);
        return true;
    
    }


    /// Command block begins here
    discordclient.commands.some(function(cmd) {

        if (command == cmd.name)
        {
            cmd.execute(message, args);
            return true;

        }
  })
})

discordclient.on('messageReactionAdd', async (reaction, user) => {
    // When we receive a reaction we check if the reaction is partial or not
  if (reaction.partial) await reaction.fetch()
  if (user.bot) return
  if (!reaction.message.guild) return

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

discordclient.on('messageReactionRemove', async (reaction, user) => {

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




const botToken = process.env.COSCYBOT
// console.log(bot_token);
discordclient.login(botToken)

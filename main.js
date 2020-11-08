const { info } = require('console')
const Discord = require('discord.js')
const fs = require('fs');
const {Client} = require('pg')
const PGConnection = require('./src/database')
const util = require('util')

const discordclient = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const db = new PGConnection()


/// prefix of commands feel free to change this
const prefix = '+'

// requiring path and fs modules
const path = require('path')

discordclient.commands = new Discord.Collection()
commandCategories = []

// joining path of directory

const directoryPath = path.join(__dirname, 'commands')

const { readdirSync } = require('fs')

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)


getDirectories(directoryPath).forEach(function(dir) {


    // passing directoryPath and callback function
    fs.readdir(directoryPath + "/" + dir, function (err, files) {
        // handling error

            var cat_name = dir
            var cat_description = "No Description."
            var cat_commands = []
        
            if (err) {
            return console.log('Unable to scan directory: ' + err)
            }

            
            if (fs.existsSync(`${directoryPath}/${dir}/.info`)) {
                cat_description = fs.readFileSync(`${directoryPath}/${dir}/.info`, 'utf8')
            }
          
            console.log(cat_description)
            
            // listing all files using forEach
                files.filter(name => name.endsWith(".js")).forEach(function (file) {
                    // Do whatever you want to do with the file
            
                const command = require(`./commands/${dir}/${file}`)
                if(typeof command.name !== "undefined") {
                    discordclient.commands.set(command.name, command)
                    cat_commands.push({name: command.name, description: command.description})
                    console.log(file)
                }
            })

            commandCategories.push({
                catName: cat_name,
                catDescription: cat_description,
                catCommands: cat_commands
            })


        })


})




discordclient.once('ready' , () => {
    db.connect()
    console.log('Jarvis is Online!');
});

discordclient.on('guildMemberAdd', member => {

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
           v
 +-----------------------+   +----------------+
 |New user clicks Welcome|   |Bot welcomes the|
 |emoji, gaining the     +-->+new user in     +
 |"Welcomed" Role        |   |the main chat.  |
 +-----------------------+   +----------------+

 */
console.log(__dirname)
fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        console.log(__dirname)
        const eventFunction = require(`./events/${file}`);
        if (eventFunction.disabled) return;
        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? discordclient[eventFunction.emitter] : eventFunction.emitter) || discordclient;
        const { once } = eventFunction;
        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args));
        }
        catch (error) {
            console.error(error.stack);
        }
    });
});

discordclient.on('message', message =>{
    if ((message.mentions.members.size > 0) && (message.cleanContent.slice(-2) === "++")) {
        message.channel.send("One point for Gryffindor!");

        db.addexppoints(message.mentions.members.first().user.id, 1).then(points =>{

            message.channel.send(`${message.mentions.members.first().user.username} has ${points} points!`)

        })
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // Help Command!
    if (command == "help") {
        const helpcmd = require('./commands/utility/help')
        helpcmd.execute(message, discordclient.commands, args);
        return true;

    }

        // Help Command!
    if (command == "commands") {
        
        const commandscmd = require('./commands/utility/commands')
        commandscmd.execute(message, commandCategories, args);
        return true;
    
    }


    /// Command block begins here


    try {

        discordclient.commands.get(command).execute(message, args)
    
    }catch(err){
        console.log(err)

        message.reply("That command doesn't exist!")

    }
    
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

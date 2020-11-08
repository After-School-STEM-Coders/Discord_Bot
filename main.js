const { info } = require('console')
const Discord = require('discord.js')
const fs = require('fs')
const { Client } = require('pg')
const PGConnection = require('./src/database')
const util = require('util')

const discordclient = global.discordclient = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const db = new PGConnection()

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

getDirectories(directoryPath).forEach(function (dir) {
  // passing directoryPath and callback function
  fs.readdir(directoryPath + '/' + dir, function (err, files) {
    // handling error
    var cat_name = dir
    var cat_description = 'No Description.'
    var cat_commands = []
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }
    if (fs.existsSync(`${directoryPath}/${dir}/.info`)) {
      cat_description = fs.readFileSync(`${directoryPath}/${dir}/.info`, 'utf8')
    }
    console.log(cat_description)
    // listing all files using forEach
    files.filter(name => name.endsWith('.js')).forEach(function (file) {
      // Do whatever you want to do with the file
      const command = require(`./commands/${dir}/${file}`)
      if (typeof command.name !== 'undefined') {
        discordclient.commands.set(command.name, command)
        cat_commands.push({ name: command.name, description: command.description })
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

discordclient.once('ready', () => {
  db.connect()
  console.log('Jarvis is Online!')
})

fs.readdir(path.join(__dirname, 'events'), function (err, files) {
  if (err) return console.error(err)
  files.forEach((file) => {
    console.log(__dirname)
    const eventFunction = require(`./events/${file}`)
    if (eventFunction.disabled) return
    const event = eventFunction.event || file.split('.')[0]
    const emitter = (typeof eventFunction.emitter === 'string' ? discordclient[eventFunction.emitter] : eventFunction.emitter) || discordclient
    const { once } = eventFunction
    try {
      emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args))
    } catch (error) {
      console.error(error.stack)
    }
  })
})


const botToken = process.env.COSCYBOT
// console.log(bot_token);
discordclient.login(botToken)

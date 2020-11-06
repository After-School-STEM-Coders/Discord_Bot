const Discord = require('discord.js')
const {Client} = require('pg')

const client = new Client({
    user: 'braian',
    host: 'localhost',
    database: 'postgres',
    password: 'superbot',
    port: 5432,
  })

var query = "select * from ross.rosstable"

module.exports = {
    name: 'testdb',
    description: 'Test the database.',
    execute(message, args){

        client.connect()
        client.query(query, (err, res) => {
          console.log(err, res)

          message.reply(res.rows[0].first_name)
          client.end()
        })


    }
}
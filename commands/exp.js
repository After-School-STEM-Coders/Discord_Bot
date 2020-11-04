const Discord = require('discord.js')

module.exports = {
    name: 'exp',
    description: 'this shows experience!',
    execute(message, args) {

        let dbvars = args[1];

        const image = message.author.avatarURL();
        const userName = message.author.username;

        const Discord = require('discord.js')
        const {Client} = require('pg')

        const check_if_table_exist = new Client({})

        const create_table = new Client({})


        async function ifnotexistcreatetable() {
            var query = "SELECT EXISTS (\n" +
              "   SELECT FROM pg_tables\n" +
              "   WHERE  schemaname = 'exp'\n" +
              "   AND    tablename  = 'exp'\n" +
              "   );"

            let promise = new Promise((resolve, reject) => {
                check_if_table_exist.connect()
                check_if_table_exist.query(query, (err, res) => {
                    console.log(err, res)
                    resolve(res.rows[0].exists)
                    check_if_table_exist.end()
                })
            })

            if (!(await promise)) {
                var query = 'CREATE SCHEMA IF NOT EXISTS exp;\n' +
                  'CREATE TABLE "exp"."exp" (\n' +
                  '    userid varchar NOT NULL,\n' +
                  '    points integer NULL\n' +
                  ');\n' +
                  'CREATE UNIQUE INDEX exp_userid_idx ON "exp"."exp" (userid);'

                create_table.connect()
                create_table.query(query, (err, res) => {
                    console.log(err, res)
                    create_table.end()
                })
            }
        }
        ifnotexistcreatetable()

        async function getexppoints() {

            var query = 'INSERT INTO "exp"."exp" (userid,points)\n' +
              `\tVALUES (\'<@${message.author.id}>\' ,1)\n` +
              '\ton conflict (userid)\n' +
              '\tdo update set\n' +
              '\t  points = "exp".points;'
            const make_if_null = new Client({})
            let promise2 = new Promise((resolve, reject) => {
                make_if_null.connect()
                make_if_null.query(query, (err, res) => {
                    console.log(err, res)
                    resolve(res)
                    make_if_null.end()
                })
            })


            if (await promise2) {
                var query = `select points from "exp"."exp" where userid like \'<@${message.author.id}>\'`

                const get_current_points = new Client({})

                get_current_points.connect()
                let current_points_promise = new Promise((resolve, reject) => {
                    get_current_points.query(query, (err, res) => {
                        console.log(err, res)
                        resolve(res)
                        get_current_points.end()
                    })
                })
                let promise_return = await current_points_promise
                let current_points = promise_return.rows[0].points

                let level = 1;
                let experience = current_points;
                let nextLevelExperience = (level) * 100
                let barPercentage = experience / nextLevelExperience;
                let numSquares = Math.floor(20 * barPercentage);

                let bar = "";


                for (let i = 0; i < 20; i++) {
                    if (i < numSquares) {
                        bar += "🟩";
                    } else {
                        bar += "⬜";
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
        getexppoints()

        }
    }
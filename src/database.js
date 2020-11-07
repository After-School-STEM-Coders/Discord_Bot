
const { DataResolver } = require('discord.js');
const {Client} = require('pg')


module.exports = class PGConnection {

    constructor() {
        this.client = new Client({})
    }

    async connect() {
        await this.client.connect();
    }

    async close(){
        await this.client.end();
    }

    async getexppoints(userid) {
        var query = `select points from "exp"."exp" where userid like \'<@${userid}>\'`

        return new Promise(resolve => {

            this.client.query(query, (err, newpoints) => {

                resolve(newpoints.rows[0].points)
                
            })

        })        

    }

    async addexppoints(userid, points) {

        return new Promise(resolve => {

            var query = "INSERT INTO \"exp\".\"exp\" (userid,points)\n" +
          `\tVALUES (\'<@${userid}>\' ,'1')\n` +
          "\ton conflict (userid)\n" +
          "\tdo update set\n" +
          `\t  points = exp.\"exp\".points + ${points};`

            
        this.client.query(query, (err, res) => {
                console.log(err, res)

                var query = `select points from "exp"."exp" where userid like \'<@${userid}>\'`

                this.getexppoints(userid).then(newpoints => {

                    resolve(newpoints)

                }) 
              
                
            })

        })
        
        
    }
    
}


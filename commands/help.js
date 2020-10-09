module.exports = {
    name: 'help',
    description: 'Used to get information about a command.\nUsage: **+help [command]**',
    execute(message, commands, args){
        let found = false;
        
        if (!args || !args[0]){
            message.channel.send("Incorrect usage. Type **+help [command]** to get insights on an specific command!");
            return true;
        }
        else{

            /// Command block begins here
            commands.some(function(cmd) {

                if (args[0] == cmd.name)
                {
                    message.channel.send(cmd.description);
                    found = true;

                }
            });

            if(!found)
                message.channel.send(`**${args[0]}** is not a valid command.`);

        }




    }
}
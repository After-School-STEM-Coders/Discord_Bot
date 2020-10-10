module.exports = {
    name: 'identity',
    description: 'Shows information about the current bot process.',
    execute(message, args){
        message.channel.send(`The current process id is ${process.pid}.\nIt has been running for ${process.uptime()} seconds.`);
    }
}
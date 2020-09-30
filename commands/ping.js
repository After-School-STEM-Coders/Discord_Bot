module.exports = {
    name: 'ping',
    description: 'this pings!',
    execute(message, args){
        message.channel.send('pong!');
    }
}
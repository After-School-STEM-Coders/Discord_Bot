module.exports = {
    name: 'identity',
    description: 'Shows information about the current bot process.',
    execute(message, args){
        const { networkInterfaces } = require('os');
        const os = require('os');
        const nets = networkInterfaces();
        const results = Object.create(null); // or just '{}', an empty object

        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!results[name]) {
                        results[name] = [];
                    }

                    results[name].push(net.address);
                }
            }
        }
        const full_ip_info = JSON.stringify(results);
        message.channel.send(`The current process id is ${process.pid}.\nIt has been running for ${process.uptime()} seconds.\nIP Address: ${full_ip_info}\nHostname: ${os.hostname()}`);
    }
}
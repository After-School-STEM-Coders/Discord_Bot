module.exports = {
    name: 'identity',
    description: 'Shows information about the current bot process.',
    execute(message, args){

        function formatuptime(time) {

            let remainder = time;

            let days = Math.floor(remainder / 86400);
            remainder = remainder % 86400;

            let hours = Math.floor(remainder / 3600);
            remainder = remainder % 3600;

            let minutes = Math.floor(remainder / 60);
            remainder = Math.floor(remainder % 60);

            return `${days} days, ${hours} hours, ${minutes} minutes, and ${remainder} seconds.`


        }

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

        let uptime = formatuptime(process.uptime())
        message.channel.send(`The current **process id** is **${process.pid}**.\nIt has been running for **${uptime}**\n\n**IP Address**: ${full_ip_info}\n**Hostname**: ${os.hostname()}`);
    }
}
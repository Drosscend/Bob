const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'bot',
            description: {
                content: 'Permet de connaitre la latence du bot',
            },
        });
    }

    async exec(message) {
        const sent = await message.channel.send('Pong!');
        const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
        return sent.edit([
            'Pong!',
            `🔂 **RTT**: ${timeDiff} ms`,
            `💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`
        ]);
    }
}

module.exports = PingCommand;

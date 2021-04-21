const { Command } = require('discord-akairo');

class test extends Command {
    constructor() {
        super('test', {
            aliases: ['test'],
            category: 'admin',
            description: {
                content: 'Permet de faire des expérience sur du code'
            },
            ownerOnly: true
        });
    }

    async exec(message) {
        message.channel.send(this.client.Utils.embed.color)
    }
}

module.exports = test;
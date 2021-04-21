const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            args: [
                {
                    id: 'prefix'
                }
            ],
            channel: 'guild',
            category: 'bot',
            description: {
                content: 'Permet de changer le prefix',
                usage: '[prefix]',
                examples: ['?']
            },
			userPermissions: ['ADMINISTRATOR'],
        });
    }

    async exec(message, args) {
        const prefix = message.guild.prefix;

        if (!args.prefix)
            return message.channel.send(
                `*Le prefix est actuellement **\`${prefix}\`***\n*Vous pouvez le changé en faisant: **\`${prefix}prefix <prefix>\`***`
            );

        if (prefix === args.prefix)
            return message.channel.send(
                '***Sorry**, est le prefix actuel.*'
            );

        message.guild.set(`prefix`, args.prefix);

        return message.channel.send(
            `*Le prefix à bien été changé de **\`${prefix}\`** a **\`${args.prefix}\`***`
        );
    }
}

module.exports = PrefixCommand;

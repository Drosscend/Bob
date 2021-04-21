const { Command } = require('discord-akairo');

class purgeCommand extends Command {
    constructor() {
        super('purge', {
            aliases: ['purge'],
            args: [
                {
                    id: 'count',
                    type: 'number'
                }
            ],
            channel: 'guild',
            clientPermissions: ['MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY'],
            userPermissions: 'MANAGE_MESSAGES',
            category: 'moderation',
            description: {
                content: 'Permet de supprimé un nombre de messages',
                usage: '<nombre>',
                examples: ['18']
            },
        });
    }

    async exec(message, args) {
        const channel = message.channel;
        const count = args.count;

        if (channel.type === 'dm') {
            return message.channel.send(
                'Cette commande ne peut pas être utilisée dans les messages privés.'
            );
        }
        if (!count || isNaN(count)) {
            return message.channel.send('Veuillez saisir un nombre.');
        }
        if (count > 99) {
            return message.channel.send(
                'Veuillez saisir un nombre inférieur à 99.'
            );
        }
        try {
            await message.channel.bulkDelete(count + 1);
            await message.channel.send(`${count} message(s) supprimé`);
        } catch (err) {
            this.client.logger.error(
                `Impossible de supprimer les messages!\n\n${err}`
            );
            message.channel.send(
                `Désolé, je n'ai pu supprimer aucun message !\n\`\`\`${err}\`\`\``
            );
        }
    }
}

module.exports = purgeCommand;

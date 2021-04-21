const { Command } = require('discord-akairo');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'h'],
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                    default: null
                }
            ],
            category: 'bot',
            description: {
                content: 'Affiche des informations sur une commande',
                usage: '[nom de la commande]',
                examples: ['ping']
            }
        });
    }

    exec(message, { command }) {
        const prefix = message.guild.prefix;
        const embed = this.client.util
            .embed()
            .setColor(this.client.Utils.embed.color)
            .setFooter(
                this.client.Utils.embed.botName,
                this.client.Utils.embed.botIcon
            );

        if (command) {
            embed
                .addField(
                    '❯ Usage',
                    `\`${command.aliases[0]} ${
                        command.description.usage
                            ? command.description.usage
                            : 'Aucun usage fourni.'
                    }\``
                )
                .addField(
                    '❯ Description',
                    `\`${command.aliases[0]} ${
                        command.description.content
                            ? command.description.content
                            : 'Aucune description fourni.'
                    }\``
                );

            if (command.aliases.length > 1) {
                embed.addField(
                    '❯ Aliases',
                    `\`${command.aliases.join('`, `')}\``
                );
            }
            if (
                command.description.examples &&
                command.description.examples.length
            ) {
                embed.addField(
                    '❯ Examples',
                    `\`${
                        command.aliases[0]
                    } ${command.description.examples.join(
                        `\`\n\`${command.aliases[0]} `
                    )}\``
                );
            }
        } else {
            embed.setTitle('Liste des commandes').setDescription(
                `Pour obtenir des informations supplémentaires sur une commande, tapez \`${prefix}help <commande>\` .
                <> nécessaire, [] facultative`
            );

            for (const category of this.handler.categories.values()) {
                embed.addField(
                    `❯ ${category.id.replace(/(\b\w)/gi, lc =>
                        lc.toUpperCase()
                    )} - ${category.size}`,
                    `${category
                        .filter(cmd => cmd.aliases.length > 0)
                        .map(cmd => `\`${cmd.aliases[0]}\``)
                        .join(', ')}`
                );
            }
        }

        return message.channel.send(embed);
    }
}

module.exports = HelpCommand;
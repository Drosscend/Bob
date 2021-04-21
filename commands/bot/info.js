const { Command } = require('discord-akairo');

class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info', 'stats'],
            category: 'bot',
            description: {
                content: "Permet davoir des informations sur le bot"
            },
        });
    }

    async exec(message) {
        const lines = [
            `Préfix actuel: \`${message.guild.prefix}\``,
            `Commandes chargées: \`${this.client.commandHandler.modules.size}\``,
            `Allias des commandes: \`${this.client.commandHandler.aliases.size}\``,
            `Serveurs: \`${this.client.guilds.cache.size}\``,
            `Utilisateurs: \`${this.client.guilds.cache.reduce((c, v) => c + v.memberCount, 0)}\``,
            `Invitation du bot: [Link](https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot)`
        ]
        
        const embed = this.client.util
            .embed()
            .setColor(this.client.Utils.embed.color)
            .setFooter(this.client.Utils.embed.botName, this.client.Utils.embed.botIcon)
            .setTitle('Information')
            .setDescription(`  •  ${lines.join('\n  •  ')}`);
        
        return message.channel.send(embed);
    }
}

module.exports = InfoCommand;

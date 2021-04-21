const { Command } = require('discord-akairo');

class avatar extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar'],
            category: 'Utiles',
            description: {
                content: "Permet d'afficher votre avatar"
            },
        });
    }

    async exec(message) {

        const embed = this.client.util
            .embed()
            .setColor(this.client.Utils.embed.color)
            .setFooter(
                this.client.Utils.embed.botName,
                this.client.Utils.embed.botIcon
            )
            .setTitle('Votre avatar :')
            .setDescription(`Cliquer sur le lien pour l'ouvir en grand sur votre navigateur [ici](${message.author.displayAvatarURL()}?size=1024)`)
            .setImage(message.author.displayAvatarURL());

        return message.channel.send(embed);
    }
}

module.exports = avatar;

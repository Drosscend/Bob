const { Command } = require('discord-akairo');

class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            args: [
                {
                    id: 'member',
                    type: 'user'
                },
                {
                    id: 'raison',
                    type: 'string'
                }
            ],
            channel: 'guild',
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            category: 'moderation',
            description: {
                content: 'Permet de kick un utilisateur',
                usage: '<membre> [raison]',
                examples: ['< @Mention | id | username >', '< @Mention | id | username > spam']
            },
        });
    }

    async exec(message, args) {
        const member = args.member;
        var reason = args.reason;

        if (message.channel.type === 'dm') {
            return message.channel.send(
                'Cette commande ne peut pas être utilisée dans les messages privés.'
            );
        }

        if (!member) {
            return message.reply('Aucun membre trouvé');
        }

        if (member.id === message.author.id) {
            return message.reply('Vous ne pouvez pas vous kick vous même');
        }

        if (!reason) {
            reason = 'Aucune raison fournie';
        }

        const banned = await message.guild.fetchBans();
        if (banned.some(m => m.user.id === user.id)) {
            return message.reply("L'utilisateur est déjà kick", {
                username: user.tag
            });
        }

        if (!member.kickable) {
            return message.reply("L'utilisateur ne peut pas être kick");
        }

        await member
            .kick(reason)
            .then(() => {
                const embed = new MessageEmbed()
                    .setTitle('Membre kick!')
                    .setColor(this.client.Utils.embed.color)
                    .setFooter(
                        this.client.Utils.embed.botName,
                        this.client.Utils.embed.botIcon
                    )
                    .setThumbnail(member.avatarURL)
                    .setDescription(
                        `**Serveur**: ${member.guild.name}\n` +
                            '' +
                            `**Membre**: ${member.user.tag}\n` +
                            '' +
                            `**Raison**: ${reason}`
                    );

                message.channel.send(embed);
            })
            .catch(err => {
                message.channel.send(
                    `Je n'ai pas pu kick **${member.user.tag}**.`
                );
                this.client.logger.error(err);
            });
    }
}

module.exports = KickCommand;

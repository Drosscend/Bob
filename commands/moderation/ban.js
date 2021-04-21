const { Command } = require('discord-akairo');

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
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
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            channel: 'guild',
            category: 'moderation',
            description: {
                content: 'Permet de bannir un utilisateur',
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
            return message.reply('Vous ne pouvez pas vous ban vous même');
        }

        if (!reason) {
            reason = 'Aucune raison fournie';
        }

        const banned = await message.guild.fetchBans();
        if (banned.some(m => m.user.id === user.id)) {
            return message.reply("L'utilisateur est déjà ban", {
                username: user.tag
            });
        }

        if (!member.bannable) {
            return message.reply("L'utilisateur ne peut pas être ban");
        }

        await member
            .ban(reason)
            .then(() => {
                const embed = new MessageEmbed()
                    .setTitle('Membre ban!')
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
                    `Je n'ai pas pu ban **${member.user.tag}**.`
                );
                this.client.logger.error(err);
            });
    }
}

module.exports = BanCommand;

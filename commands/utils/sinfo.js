const { Command } = require('discord-akairo');

const moment = require('moment');

const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'Aucun rôle',
    ALL_MEMBERS: 'Tout le monde'
};

const verificationLevels = {
    NONE: 'Aucun',
    LOW: 'Faible',
    MEDIUM: 'Moyen',
    HIGH: '(╯°□°）╯︵ ┻━┻ (HAUT)',
    VERY_HIGH: '┻━┻ ︵ヽ(`□´)ﾉ︵ ┻━┻ (TRES_HAUT)'
};

const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};

class ServeurInfo extends Command {
    constructor() {
        super('serveruinfo', {
            aliases: ['serveruinfo', 'sinfo'],
            category: 'Utiles',
            description: {
                usage: 'serverinfo',
                examples: ['serverinfo'],
                description: 'Affiche les informations du serveurs'
            }
        });
    }

    async exec(message) {
        const roles = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;

        const embed = this.client.util
            .embed()
            .setColor(this.client.Utils.embed.color)
            .setFooter(
                this.client.Utils.embed.botName,
                this.client.Utils.embed.botIcon
            )
            .setDescription(`**Informations sur le serveur _${message.guild.name}_**`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('General', [
                `** Nom:** ${message.guild.name}`,
                `** ID:** ${message.guild.id}`,
                `** Propriétaire:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
                `** Région:** ${regions[message.guild.region]}`,
                `** Tier du Boost:** ${
                    message.guild.premiumTier
                        ? `Tier ${message.guild.premiumTier}`
                        : 'Aucun'
                }`,
                `** Filtre explicite:** ${
                    filterLevels[message.guild.explicitContentFilter]
                }`,
                `** Niveau de vérification:** ${
                    verificationLevels[message.guild.verificationLevel]
                }`,
                `** Jour de création:** ${moment(message.guild.createdTimestamp).format(
                    'Ll'
                )} ${moment(message.guild.createdTimestamp).fromNow()}`,
                '\u200b'
            ])
            .addField(
                'Statistiques',
                [
                    `** Rôles:** ${roles.length}`,
                    `** Emojis:** ${emojis.size}`,
                    `** Emojis ordinaires:** ${
                        emojis.filter(emoji => !emoji.animated).size
                    }`,
                    `** Emojis animés:** ${
                        emojis.filter(emoji => emoji.animated).size
                    }`,
                    `** Nombre de membres:** ${message.guild.memberCount}`,
                    `** Humain:** ${
                        members.filter(member => !member.user.bot).size
                    }`,
                    `** Bots:** ${
                        members.filter(member => member.user.bot).size
                    }`,
                    `** Canaux de texte:** ${
                        channels.filter(channel => channel.type === 'text').size
                    }`,
                    `** Canal vocal:** ${
                        channels.filter(channel => channel.type === 'voice')
                            .size
                    }`,
                    `** Comptage du Boost:** ${
                        message.guild.premiumSubscriptionCount || '0'
                    }`
                ],
                true
            )
            .addField(
                'Présence',
                [
                    `** En ligne:** ${
                        members.filter(
                            member => member.presence.status === 'online'
                        ).size
                    }`,
                    `** Inactif:** ${
                        members.filter(
                            member => member.presence.status === 'idle'
                        ).size
                    }`,
                    `** Ne pas déranger:** ${
                        members.filter(
                            member => member.presence.status === 'dnd'
                        ).size
                    }`,
                    `** Hors ligne:** ${
                        members.filter(
                            member => member.presence.status === 'offline'
                        ).size
                    }`
                ],
                true
            )

            .addField(
                `Rôles [${roles.length - 1}]`,
                roles.length < 10
                    ? roles.join(', ')
                    : roles.length > 10
                    ? trimArray(roles)
                    : 'None'
            )
            .setTimestamp();
        message.channel.send(embed);
    }
}

function trimArray(arr, maxLen = 10) {
    if (arr.length > maxLen) {
        const len = arr.length - maxLen;
        arr = arr.slice(0, maxLen);
        arr.push(`${len} plus...`);
    }
    return arr;
}

module.exports = ServeurInfo;

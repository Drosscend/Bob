const { Command } = require('discord-akairo');

const moment = require('moment');

class UserInfo extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo', 'uinfo'],
            args: [
              {
                  id: 'member',
                  type: 'user'
              }
          ],
            description: {
                usage: 'serverinfo',
                examples: ['serverinfo'],
                description: "Affiche les informations d'un utilisateur"
            },
            category: 'Utiles'
        });
    }

    async exec(message, args) {
      let target = args.member;
      if(!target){
        target = message.author
      }
            
      const embed = this.client.util
      .embed()
      .setColor(this.client.Utils.embed.color)
      .setFooter(
          this.client.Utils.embed.botName,
          this.client.Utils.embed.botIcon
      )
         .setTitle("Information de l'utilisateur")
         .setThumbnail(target.displayAvatarURL({ format: 'jpg' }))
         .setAuthor(`${target.username} Info`, target.displayAvatarURL({ format: 'jpg' }))
         .addField("**Nom d'utilisateur:**", `${target.username}`, true)
         .addField("**Discriminateur:**", `${target.discriminator}`, true)
         .addField("**ID:**", `${target.id}`, true)
         .addField("**Statut:**", `${target.presence.status}`, true)
         .addField("**Créé le:**", `${target.createdAt}`, true)
         .addField("\u200b", `\u200b`, true)

     message.channel.send(embed);
    }
}

module.exports = UserInfo;

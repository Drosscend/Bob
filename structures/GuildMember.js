const { Structures } = require('discord.js');

Structures.extend('GuildMember', GuildMember => {
    class GuildMemberExt extends GuildMember {
        constructor(...args) {
            super(...args);
        }

        // Renvoie le solde de l'utilisateur, ou zéro.
        // <Guild>.balance
        get balance() {
            return this.get('balance', 0);
        }

        // Les méthodes suivantes sont toutes nommées par Guild ID et Member ID.
        // Exemples:
        // <GuildMember>.get('balance', 0);
        // <GuildMember>.set('balance', 500);
        get(key, fallback) {
            return (
                this.client.db.get(`${this.guild.id}_${this.id}_${key}`) ||
                fallback
            );
        }

        set(key, data) {
            return this.client.db.set(
                `${this.guild.id}_${this.id}_${key}`,
                data
            );
        }

        delete(key) {
            return this.client.db.delete(`${this.guild.id}_${this.id}_${key}`);
        }
    }

    return GuildMemberExt;
});

const { Structures } = require('discord.js');
require('dotenv').config();

Structures.extend('Guild', Guild => {
    class GuildExt extends Guild {
        constructor(...args) {
            super(...args);
        }

        // Retourne le préfixe de la Guilde
        // <Guild>.prefix
        get prefix() {
            return this.get('prefix', process.env.PREFIX);
        }

        // Les méthodes suivantes sont toutes nommées par Guild ID.
        // Exemples:
        // <Guild>.get('loggingChannelID', [fallback]);
        // <Guild>.set('loggingChannelID', '767503881869459467')
        get(key, fallback) {
            return this.client.db.get(`${this.id}_${key}`) || fallback;
        }

        set(key, data) {
            return this.client.db.set(`${this.id}_${key}`, data);
        }

        delete(key) {
            return this.client.db.delete(`${this.id}_${key}`);
        }
    }

    return GuildExt;
});

module.exports = class Utils {
    constructor(client) {
        this.client = client;
    }

    // this.client.Utils.embed;
    get embed() {
        return {
            color: '0x7289da',
            botName: this.client.user.tag,
            botIcon: this.client.user.displayAvatarURL()
        };
    }
};

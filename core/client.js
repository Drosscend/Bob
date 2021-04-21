const path = require('path');
const {
    AkairoClient,
    CommandHandler,
    ListenerHandler
} = require('discord-akairo');
require('dotenv').config();
const db = require('quick.db');
const Utils = require('./utils.js');

require('../structures/Guild.js');
require('../structures/GuildMember.js');

// Import Logger
const Logger = require('./logger.js');

module.exports = class Client extends AkairoClient {
    constructor() {
        super(
            {
                ownerID: process.env.OWNERID
            },
            {
                disableEveryone: true
            }
        );

        this.commandHandler = new CommandHandler(this, {
            directory: path.join(__dirname, '..', 'commands/'),
            prefix: message =>
                message.guild ? message.guild.prefix : process.env.PREFIX
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: path.join(__dirname, '..', 'listeners/')
        });
        
        this.db = db;
        this.Utils = new Utils(this);
        this.logger = Logger;
    }

    async login(token) {
        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
        return super.login(token);
    }
};

const { Argument, Command } = require('discord-akairo');

class DiceCommand extends Command {
    constructor() {
        super('dice', {
            aliases: ['dice'],
            args: [
                {
                    id: 'x',
                    type: Argument.range('number', 1, 6),
                    prompt: {
                        start: 'Devinez un nombre entre 1-6:',
                        retry:
                            'Nombre non valide. Veuillez entrer un nombre valide.'
                    }
                }
            ],
            category: 'fun',
            description: {
                content: 'Chercher le bon nombre'
            },
        });
    }

    isEqual(x, y) {
        if (x === y) {
            return true;
        } else {
            return false;
        }
    }

    exec(message, { x, y }) {
        const ranNum = Math.floor(Math.random() * 6) + 1;
        if (this.isEqual(x, ranNum)) {
            return message.reply(
                `Votre numéro était ${x} et le numéro aléatoire était ${ranNum}. Vous gagnez.`
            );
        }
        return message.reply(
            `Votre numéro était ${x} et le numéro aléatoire était ${ranNum}. Vous perdez.`
        );
    }
}

module.exports = DiceCommand;

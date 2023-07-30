const { EmbedBuilder } = require("discord.js")
const moment = require("moment");
moment.locale("pt-br");

module.exports = {
    exampleEmbed: async function () {
        return new EmbedBuilder({
            author: {
                name: '',
                iconURL: '',
            },
            description:
                ``,
            footer: {
                text: ``,
                iconURL: '',
            }
        }).setColor(``);
    }
}

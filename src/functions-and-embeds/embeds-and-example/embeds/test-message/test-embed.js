const { EmbedBuilder } = require("discord.js")
const moment = require("moment");
moment.locale("pt-br");

module.exports = {
    announceEmbed: async function (msg) {
        return new EmbedBuilder({
            author: {
                name: 'Message test!',
                iconURL: 'https://cdn.discordapp.com/emojis/1038147837432696973.webp?size=96&quality=lossless',
            },
            description:
                `Test message`,
            footer: {
                text: `Test message sent ${moment().format('LLLL')}.`
            }
        })
    }
}

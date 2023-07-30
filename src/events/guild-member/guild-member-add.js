const moment = require("moment")
moment.locale(`pt-br`)
const Event = require('../../structures/Event.js')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberAdd'
        })
    }

    run = async (member) => {
        if (member.guild && member.guild.id == this.client.mainConfig.guildId) {

            member.roles.add(this.client.config.mainConfig.roleWelcome)
        }
    }
}
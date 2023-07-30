const { PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Comando para enviar uma mensagem em embed!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    run: async (client, interaction) => {
        let embed = await client.embeds.testEmbed();

        interaction.channel.send({ embeds: [embed] })
        interaction.reply({ content: `Mensagem enviada com sucesso!`, ephemeral: true })
    }
};
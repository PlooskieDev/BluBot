import { SlashCommandBuilder, MessageFlags } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Greet Blu!')

export async function execute(interaction) {
    await interaction.reply({
        content: "Barf!",
        flags: MessageFlags.Ephemeral
    })
}

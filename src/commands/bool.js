import { SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('bool')
    .setDescription('Blu answers your closed question.')

export async function execute(interaction) {
    await interaction.reply({
        content: Math.random() < 0.5 ? ":green_square:" : ":red_square:"
    })
}

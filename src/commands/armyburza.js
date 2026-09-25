import { SlashCommandBuilder, MessageFlags } from 'discord.js'
import { findNewListings, formatListings } from '../lib/armyburza.js'

export const data = new SlashCommandBuilder()
    .setName('armyburza')
    .setDescription('Blu checks ArmyBurza for new listings.')

export async function execute(interaction) {

    await interaction.deferReply()

    const newListings = await findNewListings()

    if (!newListings) {
        await interaction.editReply({
            content: "Couldn't reach ArmyBurza! 🐕"
        })
        return
    }

    if (newListings.length === 0) {
        await interaction.editReply({
            content: "Nothing new on ArmyBurza since the last check."
        })
        return
    }

    // Suppress embeds so the links don't spawn a wall of previews
    await interaction.editReply({
        content: formatListings(newListings),
        flags: MessageFlags.SuppressEmbeds
    })
}

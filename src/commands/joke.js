import { SlashCommandBuilder, codeBlock } from 'discord.js'

const jokeURL = 'https://v2.jokeapi.dev/joke/Any?type=single'

export const data = new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Blu provides a quality joke.')

export async function execute(interaction) {

    await interaction.deferReply()

    const response = await fetch(jokeURL)
    const { joke } = await response.json()

    await interaction.editReply({
        content: codeBlock(joke)
    })
}

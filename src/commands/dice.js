import { SlashCommandBuilder, MessageFlags } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('dice')
    .setDescription('Blu throws an n-sided dice.')
    .addIntegerOption(option => option
        .setName('sides')
        .setDescription('How many sides does the dice have?')
        .setRequired(true)
        .setMinValue(2)
        .setMaxValue(1000))

export async function execute(interaction) {

    const sides = interaction.options.getInteger('sides', true)

    // Discord enforces the range already, this is just a safety net
    if (sides < 2)
        return interaction.reply({ content: "Cannot throw a less than two - sided dice!", flags: MessageFlags.Ephemeral })

    if (sides > 1000)
        return interaction.reply({ content: "Such a dice is just silly, no?", flags: MessageFlags.Ephemeral })

    const num = Math.floor(Math.random() * sides) + 1

    await interaction.reply({
        content: `Result of throwing a ${sides}-sided dice:\n> **${num}**`
    })
}

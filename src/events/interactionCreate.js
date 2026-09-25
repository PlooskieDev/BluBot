import { Events, MessageFlags } from 'discord.js'

export const name = Events.InteractionCreate

export async function execute(interaction) {

    if (!interaction.isChatInputCommand())
        return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)

        const reply = {
            content: "Woof! Something went wrong! 🐕",
            flags: MessageFlags.Ephemeral
        }

        if (interaction.replied || interaction.deferred)
            await interaction.followUp(reply)
        else
            await interaction.reply(reply)
    }
}

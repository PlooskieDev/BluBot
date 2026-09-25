import { readdir } from 'node:fs/promises'
import { REST, Routes } from 'discord.js'

// Registers slash commands with Discord. Run only when commands change: npm run deploy
const dir = new URL('./commands/', import.meta.url)
const files = (await readdir(dir)).filter(file => file.endsWith('.js'))
const commands = await Promise.all(files.map(async file => (await import(new URL(file, dir))).data.toJSON()))

const rest = new REST().setToken(process.env.TOKEN)
const { id: applicationId } = await rest.get(Routes.currentApplication())
const guildId = process.env.GUILD_ID

// Guild commands update instantly, global ones may take a while to show up
const route = guildId
    ? Routes.applicationGuildCommands(applicationId, guildId)
    : Routes.applicationCommands(applicationId)

const registered = await rest.put(route, { body: commands })

console.log(`Registered ${registered.length} commands ${guildId ? `to guild ${guildId}` : 'globally'}`)

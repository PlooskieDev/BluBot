import { readdir } from 'node:fs/promises'
import { Client, Collection, GatewayIntentBits } from 'discord.js'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

// Load every module in a folder next to this file
async function loadModules(folder) {
    const dir = new URL(`./${folder}/`, import.meta.url)
    const files = (await readdir(dir)).filter(file => file.endsWith('.js'))

    return Promise.all(files.map(file => import(new URL(file, dir))))
}

// COMMANDS
client.commands = new Collection()

for (const command of await loadModules('commands')) {
    client.commands.set(command.data.name, command)
}

// EVENTS
for (const event of await loadModules('events')) {
    if (event.once)
        client.once(event.name, (...args) => event.execute(...args))
    else
        client.on(event.name, (...args) => event.execute(...args))
}

client.login(process.env.TOKEN)

import { Events } from 'discord.js'
import { startListingWatcher } from '../lib/listingWatcher.js'

export const name = Events.ClientReady
export const once = true

export async function execute(client) {
    console.log(`\nLogged in as ${client.user.tag}`)

    await startListingWatcher(client)

    console.log("BluBot up and running!")
}

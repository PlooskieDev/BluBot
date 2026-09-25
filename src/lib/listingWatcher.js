import { MessageFlags } from 'discord.js'
import { findNewListings, formatListings } from './armyburza.js'

// Periodically checks ArmyBurza and posts new listings to LISTINGS_CHANNEL_ID
export async function startListingWatcher(client) {

    const channelId = process.env.LISTINGS_CHANNEL_ID
    const intervalMinutes = Number(process.env.LISTINGS_INTERVAL_MINUTES) || 15

    if (!channelId) {
        console.log("Listing watcher disabled, set LISTINGS_CHANNEL_ID in .env to enable it.")
        return
    }

    const channel = await client.channels.fetch(channelId).catch(() => null)

    if (!channel?.isSendable()) {
        console.error(`Listing watcher disabled, can't send messages to channel ${channelId}.`)
        return
    }

    let running = false

    const check = async () => {

        // Skip this tick if the previous check is still going
        if (running)
            return

        running = true

        try {
            const newListings = await findNewListings()

            if (newListings?.length > 0) {
                await channel.send({
                    content: formatListings(newListings),
                    flags: MessageFlags.SuppressEmbeds
                })
            }
        } catch (error) {
            console.error(`Listing watcher error: ${error.message}`)
        } finally {
            running = false
        }
    }

    await check()
    setInterval(check, intervalMinutes * 60 * 1000)

    console.log(`Listing watcher posting to #${channel.name} every ${intervalMinutes} minutes.`)
}

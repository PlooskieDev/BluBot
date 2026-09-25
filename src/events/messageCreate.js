import { Events } from 'discord.js'
import { respondToPlay, respondToCatGif, respondToDogGif } from '../lib/responses.js'

export const name = Events.MessageCreate

// BASIC RESPONSES
export function execute(message) {

    if (message.author.bot)
        return

    respondToPlay(message)
    respondToCatGif(message)
    respondToDogGif(message)

    switch (message.content.toLowerCase()) {
        case "https://tenor.com/view/dog-smile-zoom-happy-smiling-dog-gif-16252780":
            message.reply("That's a nice GIF!")
            break
        default:
            break
    }
}

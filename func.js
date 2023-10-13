function getYesOrNo() {

    const bool = Math.floor(Math.random() * 2) + 1

    if (bool == 1)
        return ":green_square: YES! :green_square:"
    else
        return ":red_square: NO! :red_square:"
}

function diceRoll(sides) {

    if (sides < 2) {
        return "Cannot throw a less than two-sided dice!"
    }
    else
        return Math.floor(Math.random() * sides) + 1
}

function respondToPlay(message) {
    if (message.content.toLowerCase().includes("hrat") || message.content.toLowerCase().includes("hrát")) {
        message.reply("Hrát?!")
    }
    else if (message.content.toLowerCase().includes("play")) {
        message.reply("Play?!")
    }
}

module.exports = { getYesOrNo, diceRoll, respondToPlay };
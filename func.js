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

module.exports = { getYesOrNo, diceRoll };
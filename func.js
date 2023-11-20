function getYesOrNo() {

    const bool = Math.floor(Math.random() * 2) + 1

    if (bool == 1)
        return ":green_square:"
    else
        return ":red_square:"
}

function diceRoll(sides) {

    if (sides < 2) {

        return ["Cannot throw a less than two - sided dice!", true]
    }
    else if (sides > 1000) {

        return ["Such a dice is just silly, no?", true]
    }
    else {

        var num = Math.floor(Math.random() * sides) + 1

        return [`Result of throwing a ${sides}-sided dice:` + '\n> **' + num.toString() + '**', false]
    }
}

module.exports = { getYesOrNo, diceRoll };
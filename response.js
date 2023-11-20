function respondToPlay(message) {

    if (message.content.toLowerCase().includes("hrat") || message.content.toLowerCase().includes("hrát")) {
        message.reply("Hrát?!")
    }
    else if (message.content.toLowerCase().includes("play")) {
        message.reply("Play?!")
    }
}

const catResponses = [
    "I hate cats...",
    "Cats are greasy ... eww :face_vomiting:",
    "Man, fuck'em cats",
    "Cats are so lazy, I mean, do they ever go for a run like me?",
    "I don't get why cats are so finicky about their food. Just eat, it's simple!"
];

function respondToCatGif(message) {

    if (message.content.toLowerCase().includes("cat") && message.content.includes("https://tenor.com")) {

        var rnd = Math.floor(Math.random() * catResponses.length);

        message.reply(catResponses[rnd])
    }
}

const dogResponses = [
    "That's a nice doggy!",
    "What a beautiful specimen!",
    "Good boy",
    "Bet it smells nice"
];

function respondToDogGif(message) {

    if (message.content.toLowerCase().includes("dog") && message.content.includes("https://tenor.com")) {

        var rnd = Math.floor(Math.random() * dogResponses.length);

        message.reply(dogResponses[rnd])
    }
}

module.exports = { respondToPlay, respondToCatGif, respondToDogGif };
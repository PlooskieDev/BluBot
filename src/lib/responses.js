const catResponses = [
    "Noted. Unimpressed.",
    "I'm not jealous. I'm just going to sit here and stare at it.",
    "It knocked something off a table, didn't it. They always do.",
    "Cool. Anyway, has anyone seen my ball?",
    "I respect the confidence. Not the cat. Just the confidence.",
    "That cat has never once come when called and it shows.",
    "Fine, that one was a little funny.",
    "I've been told to be nice to the cat. I'm being nice to the cat.",
    "Suspicious animal. Keep an eye on it.",
    "Anything a cat can do, I can do louder."
]

const dogResponses = [
    "Good dog. Very good dog.",
    "That's a colleague of mine.",
    "I know that dog. We've never met, but I know him.",
    "Solid work. No notes.",
    "This is the content I'm here for.",
    "He has no idea what he's doing and that's the best part.",
    "Someone give that dog a treat. Then give me one.",
    "Honestly? Relatable.",
    "That's the spirit.",
    "Barf. (That's a compliment.)",
    "I would follow that dog into battle.",
    "Ten out of ten. Would sniff."
]

const pickRandom = (list) => list[Math.floor(Math.random() * list.length)]

export function respondToPlay(message) {

    const content = message.content.toLowerCase()

    if (content.includes("hrat") || content.includes("hrát")) {
        message.reply("Hrát?!")
    }
    else if (content.includes("play")) {
        message.reply("Play?!")
    }
}

export function respondToCatGif(message) {

    if (message.content.toLowerCase().includes("cat") && message.content.includes("https://klipy.com")) {
        message.reply(pickRandom(catResponses))
    }
}

export function respondToDogGif(message) {

    if (message.content.toLowerCase().includes("dog") && message.content.includes("https://klipy.com")) {
        message.reply(pickRandom(dogResponses))
    }
}

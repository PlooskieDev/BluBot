const Discord = require("discord.js")
require("dotenv").config()

const { Client, GatewayIntentBits } = require("discord.js")
const { request } = require("undici")

const func = require("./func")

const panzerFuchsGuildID = '232923565190545408'

// API
const jokeURL = 'https://v2.jokeapi.dev/joke/Any?type=single'

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.login(process.env.TOKEN)

client.on("ready", () => {
    console.log(`\nLogged in as ${client.user.tag}`)

    const guild = client.guilds.cache.get(panzerFuchsGuildID)
    var commands

    guild.commands.set([])

    if (guild) {
        commands = guild.commands
    }
    else {
        commands = client.application?.commands
    }

    // COMMANDS
    commands?.create({
        name: 'hello',
        description: 'Greet Blu!',
    })

    commands?.create({
        name: 'bool',
        description: 'Blu answers your closed question.',
    })

    commands?.create({
        name: 'dice',
        description: 'Blu throws an n-sided dice.',
        options: [
            {
                name: 'sides',
                description: 'How many sides does the dice have?',
                required: true,
                type: 10
            }
        ]
    })

    commands?.create({
        name: 'joke',
        description: 'Blu provides a quality joke.',
    })

    console.log("BluBot up and running!")
})

// INTERACTION
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    switch (commandName) {
        case 'hello':
            interaction.reply({
                content: "Barf!",
                // ephemeral: true
            })
            break;
        case 'bool':
            interaction.reply({
                content: func.getYesOrNo(),
                // ephemeral: true
            })
            break;
        case 'dice':
            const sides = options.getNumber('sides')

            interaction.reply({
                content: `Result of throwing a ${sides}-sided dice:` + '\n> **' + func.diceRoll(sides).toString() + '**',
                // ephemeral: true
            })
            break;
        case 'joke':
            await interaction.deferReply({
                ephemeral: false
            })

            const res = await request(jokeURL);
            const { joke } = await res.body.json();

            interaction.editReply({
                content: `\`\`\`${joke}\`\`\``
            })
            break;
        default:
            break;
    }
})

// BASIC RESPONSES
client.on("messageCreate", (message) => {
    switch (message.content) {
        case "https://tenor.com/view/dog-smile-zoom-happy-smiling-dog-gif-16252780":
            message.reply("That's a nice GIF!");
            break;
        default:
            break;
    }
})
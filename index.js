
const { Client } = require("discord.js"); //Allows me to not have files on files for discordjs
const fetch = require("node-fetch");
const client = new Client();
const PREFIX = "-";
const BotOwnerID = "271387672986124289"
const BotVersion = "v1.4"
const ACTIVITIES = {
    "poker": {
        id: "755827207812677713", 
        name: "Poker Night"
    },
    "betrayal": {
        id: "773336526917861400",
        name: "Betrayal.io"
    },
    "youtube": {
        id: "755600276941176913",
        name: "YouTube Together"
    },
    "fishington": {
        id: "814288819477020702",
        name: "Fishington.io"
    },
    "ChessInThePark": {
        id: "832012774040141894",
        name: "ChessInThePark"
},
    "ChessInTheParkDev": {
    id: "832012586023256104",
    name: "ChessInTheParkDev"
    },
    "lettertile": {
        id: "879863686565621790",
        name: "lettertile"
    },
    "wordsnack": {
        id: "879863976006127627",
        name: "wordsnack"
    },
    "doodlecrew": {
        id: "878067389634314250",
        name: "doodlecrew"
    }
};


client.on("ready", () => console.log("Discord Activity Bot by sweqtyy#0001 is now online, and ready for use. "));
client.on("warn", console.warn);
client.on("error", console.error);

client.on("message", async message => {
    if (message.author.bot || !message.guild) return;
    if (message.content.indexOf(PREFIX) !== 0) return;

    const args = message.content.slice(PREFIX.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    if (cmd === "servercount") return message.channel.send(`I am currently in **${client.guilds.cache.size}** servers!`)

    if (cmd === "servercount") return message.channel.send(`I am currently in **${client.guilds.cache.size} servers!`)
    if (cmd === "catpic") {
const apikey = "bacd081d-3413-41e7-bf87-c26a71dd76d6"

      const catpicfinder = await fetch('https://api.thecatapi.com/v1/images/search', { headers: { 'x-api-key': apikey }});
    const catpic = (await catpicfinder.json())[0].url;
        message.channel.send(`${message.member}, here is your cat picture!: ${catpic}`)
    }
    if (cmd === "help") {
        message.channel.send(`Prefix: ${PREFIX}\n\n Commands:\n\n ${Object.keys(ACTIVITIES).map(m => `**${PREFIX}activity <Channel_ID> ${m}**`).join("\n")}\n\n Misc Commands:\n\n **-coinflip**\n **-meme**\n **-catpic**\n **-dogpic**\n**-servercount**`)
    }
    if (cmd === "dogpic") {
    let dogpicfinder = await fetch('https://dog.ceo/api/breeds/image/random');
    const dogpic = (await dogpicfinder.json()).message;
        message.channel.send(`${message.member}, here is your dog picture!: ${dogpic}`)
    }
    if (cmd === "meme") {
              let memefinder = await fetch('https://meme-api.herokuapp.com/gimme');
                memefinder = await memefinder.json();
        
            message.channel.send(`${message.member}, here is your meme: ${memefinder.url}`)
        console.log("Meme command was used, sent meme.")
        }
    if (cmd === "coinflip") {
        const number = Math.ceil(Math.random() * 2);
        console.log(` A coinflip was initiated, the number chosen was ${number}`)
        if (number === 1) {
            message.channel.send(` ${message.member}, the coin landed on: **HEADS**`);
       
            } else if (number === 2) {
                            message.channel.send(` ${message.member}, the coin landed on: **TAILS**`);
            }
    }
    if (cmd === "botversion") return message.channel.send(`The bots current version is: ${BotVersion}`)
    if (cmd === "ping") return message.channel.send(`:ping_pong: Pong! \`${client.ws.ping}ms\``);
    if (cmd === "credits") return message.channel.send(`credits go to <@271387672986124289> for coding the bot, and random ppl who helped find the way to use discord activities. <3`);
    if (cmd === "invite") return message.channel.send(`You may invite the bot using the link here:\nhttps://discord.com/oauth2/authorize?client_id=751195834468532296&permissions=240519605457&scope=bot`);
    if (cmd === "yttogether") {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel || channel.type !== "voice") return message.channel.send("❌ | Invalid channel specified!");
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("❌ | I need `CREATE INSTANT INVITE` permission to work properly!");

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913", // youtube together
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (invite.error || !invite.code) return message.channel.send("❌ | Could not start **YouTube Together**!");
                message.channel.send(`✅ | Click here to start **YouTube Together** in ${channel.name}: <https://discord.gg/${invite.code}>\n brought to you by  <@271387672986124289> <3`);
            })
            .catch(e => {
                message.channel.send("❌ | Could not start **YouTube Together**!");
            })
    }
    
    // or use this
    if (cmd === "activity") {
        const channel = message.guild.channels.cache.get(args[0]);
        if (!channel || channel.type !== "voice") return message.channel.send("❌ | Invalid channel specified!");
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("❌ | I need `CREATE INSTANT_INVITE` permission");
        const activity = ACTIVITIES[args[1] ? args[1].toLowerCase() : null];
        if (!activity) return message.channel.send(`❌ | Correct formats:\n${Object.keys(ACTIVITIES).map(m => `- **${PREFIX}activity <Channel_ID> ${m}**`).join("\n")}`);

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: activity.id,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (invite.error || !invite.code) return message.channel.send(`❌ | Could not start **${activity.name}**!`);
                message.channel.send(`✅ | Click here to start **${activity.name}** in **${channel.name}**: <https://discord.gg/${invite.code}>\n brought to you by <@271387672986124289> <3`);
            })
            .catch(e => {
                message.channel.send(`❌ | Could not start **${activity.name}**!`);
            })
    }
});
//I help in ${client.guilds.cache.size} servers! || Made with love by sweqtyy#0001 <3
client.on("ready", () => client.user.setStatus('idle'))

const statuses = [ //The reason this is down here, is because we cannot use client before it's loaded.
    `I help in ${client.guilds.cache.size} servers!`,
    `This bot was made by dull#0003!`,
    `The bots current version is: ${BotVersion}`,
    "Invite me to your server using the url in my about me! <3"
  ];
  
client.on("ready", () => {
setInterval(() => {
    const randomIndex = Math.floor(Math.random() * (statuses.length - 1) + 1);
    const newActivity = statuses[randomIndex];

    client.user.setStatus('dnd');
    client.user.setActivity(newActivity)

}, 30000);

});
client.login(process.env.TOKEN);

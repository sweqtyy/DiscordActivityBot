//nicec
const { Client } = require("discord.js"); //Allows me to not have files on files for discordjs
const fetch = require("node-fetch");
const client = new Client();
const PREFIX = "-";

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

    if (cmd === "ping") return message.channel.send(`:ping_pong: Pong! \`${client.ws.ping}ms\``);
    if (cmd === "credits") return message.channel.send(`credits go to <@271387672986124289> for coding the bot, and random ppl who helped find the way to use discord activities. <3`);

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
client.setActivity('I help in ${client.guilds.cache.size} servers! || Made with love by sweqtyy#0001 <3', { type: 'WATCHING' });
client.login(process.env.TOKEN);
//nice

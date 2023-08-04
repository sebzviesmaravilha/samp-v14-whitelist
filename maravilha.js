const { Client, GatewayIntentBits, Colors, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Embed, ModalBuilder, TextInputBuilder, MessageCollector } = require("discord.js");
const Config = require("./Settings/Config.js");
const Color = require('./Settings/Colors.js');

const { readdir } = require("fs");

const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent,
     // enable if you need message content things
  ],
});

module.exports = client;

readdir("./EventLoader", (_err, files) => {
files.forEach((file) => {
if (!file.endsWith(".js")) return;
const event = require(`./EventLoader/${file}`);
let eventName = file.split(".")[0];
console.log(`${Color.Green}[+] ${Color.Magenta}Yüklenen Event; ${Color.White}${eventName}${Color.Reset}`);
client.on(eventName, event.bind(null, client));
delete require.cache[require.resolve(`./EventLoader/${file}`)];
});
});

client.commands = [];
readdir("./Commands", (err, files) => {
if (err) throw err;
files.forEach(async (f) => {
try {
let props = require(`./Commands/${f}`);
client.commands.push({
name: props.name,
description: props.description,
options: props.options
});
console.log(`${Color.Green}[+] ${Color.Magenta}Yüklenen Komut; ${Color.White}${props.name}${Color.Reset}`);
} catch (err) {
console.log(err);
}
});
});

client.login(Config.Bot.Token || process.env.TOKEN).catch(e => {
  console.log(`${Color.Green}[!] ${Color.White}Token yazılmamış veya intentler aktif edilmemiş.`)
  })

  
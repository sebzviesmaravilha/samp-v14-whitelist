const Config = require("../Settings/Config.js");
const Color = require('../Settings/Colors.js')
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { ActivityType, EmbedBuilder, Embed } = require("discord.js");

module.exports = async (client) => {

const rest = new REST({ version: "10" }).setToken(Config.Bot.Token);
(async () => {
try {
await rest.put(Routes.applicationCommands(client.user.id), {
body: await client.commands,
});

console.log(`${Color.Green}[+] ${Color.Magenta}Applikasyon komutları yüklendi.`);
console.log(`${Color.Green}[+] ${Color.Cyan}Bot ${Color.Magenta}(${client.user.tag}) ${Color.Cyan}başarılı bir şekilde aktifleştirildi.`)
} catch(e) {
console.log(`${Color.Red}[!] ${Color.White}Applikasyon komutları yüklenirken bir hata oluştu!\n${Color.Red}[HATA] => ${e}${Color.Reset}`);
}
})();

}

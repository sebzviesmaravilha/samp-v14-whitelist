const Config = require("../Settings/Config.js");
const Color = require("../Settings/Colors.js")

module.exports = async(client, member) => { 
        member.roles.add(Config.Roles.Non_Whitelist);
        setTimeout(() => {
          member.roles.cache.has(Config.Roles.Non_Whitelist) ? console.log(`${Color.Yellow}[ROL KONTROL] ${Color.Magenta}${member.user.username} ${Color.White}Rol kontrolü başarılı, giriş rolü verilmiş.${Color.Reset}`) : member.roles.add(Config.Roles.Non_Whitelist)
        }, 2000)

}

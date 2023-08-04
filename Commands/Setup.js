const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const Config = require("../Settings/Config.js");
const Color = require('../Settings/Colors.js')

module.exports = {
    name: "setup",
    description: "Whitelist bot kurulumunu yapın.",
    options: [],
    run: async (client, interaction) => {
        let iEmbed = new EmbedBuilder()
        .setColor(Config.Embed.Color)
        .setTimestamp()
        .setAuthor({name: Config.Embed.Author, iconURL: client.user.avatarURL()})
        .setFooter({text: Config.Embed.Footer, iconURL: client.user.avatarURL()})

        if(!interaction.member.roles.cache.has(Config.Roles.Owner)) return interaction.reply({embeds: [iEmbed.setDescription(`Bu komutu kullanabilmek için <@&${Config.Roles.Owner}> rolüne sahip olmalısınız.`)], ephemeral: true})

      const iRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setStyle(Config.Buttons.Form_Style)
        .setLabel(Config.Buttons.Label)
        .setCustomId(`whitelist-basvuru`))
        
        iEmbed.setImage(Config.Embed.Image)

        const iChannel = interaction.guild.channels.cache.get(Config.Channels.Whitelist);
        if(!iChannel) return;
        iChannel.send({embeds: [iEmbed.setDescription(Config.Embed.Description)], components: [iRow]})
      },
  };
    
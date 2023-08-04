const { InteractionType, ModalBuilder, ActionRowBuilder, TextInputBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");
const Config = require("../Settings/Config.js");
const Color = require('../Settings/Colors.js')
const fs = require("fs");
module.exports = async(client, interaction) => {
if(!interaction.guild) return;
if(interaction.user.bot) return;

if (interaction.type === InteractionType.ApplicationCommand) {
fs.readdir("./Commands", (err, files) => {
if (err) throw err;
files.forEach(async (f) => {
let props = require(`../Commands/${f}`);
if (interaction.commandName.toLowerCase() === props.name.toLowerCase()) {
try {
return props.run(client, interaction);
} catch (e) {
return interaction.reply({ content: `ERROR\n\n\`\`\`${e.message}\`\`\``, ephemeral: true }).catch(e => { })
}
}
});
});
}
if(interaction.isButton()){
    if(interaction.channel.id === Config.Channels.Whitelist){
        if(interaction.customId === 'whitelist-basvuru'){
            await interaction.showModal(
                new ModalBuilder({custom_id: `basvuru_${interaction.user.id}`, title: Config.Modal.Title}).addComponents(
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder({
                        type: 4,
                        style: 1,
                        custom_id: `question1`,
                        label: `Karakterinizin adı?`,
                        placeholder: `Karakterinizin adını girin.`,
                        min_length: 3,
                        max_length: 16,
                        required: true,
                      }),
                    ),
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder({
                        type: 4,
                        style: 1,
                        custom_id: `question2`,
                        label: `Karakterinizin soyadı?`,
                        placeholder: `Karakterinizin soyadını girin.`,
                        min_length: 3,
                        max_length: 16,
                        required: true,
                      }),
                    ),
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder({
                        type: 4,
                        style: 2,
                        custom_id: `question3`,
                        label: Config.Modal.Question_1,
                        min_length: 1,
                        max_length: 1000,
                        required: true,
                      }),
                    ),
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder({
                        type: 4,
                        style: 2,
                        custom_id: `question4`,
                        label: Config.Modal.Question_2,
                        min_length: 1,
                        max_length: 1000,
                        required: true,
                      }),
                    ),
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder({
                        type: 4,
                        style: 2,
                        custom_id: `question5`,
                        label: Config.Modal.Question_3,
                        min_length: 1,
                        max_length: 1000,
                        required: true,
                    }),
                    ),
                  ),
                );
                
            await interaction.awaitModalSubmit({ filter: (modal) => modal.customId === `basvuru_${interaction.user.id}`, time: 60 * 60 * 1000 }).then(async (modal) => {
                const question_1 = modal.fields.getTextInputValue('question1');
                const question_2 = modal.fields.getTextInputValue('question2');
                const question_3 = modal.fields.getTextInputValue('question3');
                const question_4 = modal.fields.getTextInputValue('question4');
                const Name = question_1.charAt(0).toLocaleUpperCase() + question_1.slice(1).toLocaleLowerCase();
                const Surname = question_2.charAt(0).toLocaleUpperCase() + question_2.slice(1).toLocaleLowerCase();

                const iChannel = client.channels.cache.get(Config.Channels.Whitelist_Staff);

                let iEmbed = new EmbedBuilder()
                .setColor(Config.Embed.Color)
                .setTimestamp()
                .setAuthor({name: Config.Embed.Author, iconURL: client.user.avatarURL()})
                .setFooter({text: Config.Embed.Footer, iconURL: client.user.avatarURL()})
                .addFields(
                    { name: `Başvuru Sahibi`, value: `${modal.user} \`(${modal.user.username} - ${modal.user.id})\``, inline: false },
                    { name: `Karakter adı ve soyadı`, value: `${Name} ${Surname}`, inline: false },
                    { name: Config.Modal.Question_1, value: question_2, inline: false },
                    { name: Config.Modal.Question_2, value: question_3, inline: false },
                    { name: Config.Modal.Question_3, value: question_4, inline: false },
                )

                const iRow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setStyle(Config.Buttons.Approve_Style)
                    .setLabel(`✅ Başvuruyu Onayla!`)
                    .setCustomId(`${modal.user.id}_approve_${Name}_${Surname}`)).addComponents(
                        new ButtonBuilder()
                        .setStyle(Config.Buttons.Disapprove_Style)
                        .setLabel(`❎ Başvuruyu Reddet!`)
                        .setCustomId(`${modal.user.id}_dissaprove_${Name}_${Surname}`)
                    )

                await iChannel.send({embeds: [iEmbed], components: [iRow], content: `<@&${Config.Roles.Whitelist_Staff}>`});
                await modal.deferUpdate();
            }).catch(() => undefined);
                };
            } else if(interaction.channel.id === Config.Channels.Whitelist_Staff){
                let iType = interaction.customId.split("_")[1];
                let iMemberID = interaction.customId.split("_")[0];
                let iName = interaction.customId.split("_")[2];
                let iSurname = interaction.customId.split("_")[3];
                if(iType === 'approve'){
                    if(!interaction.member.roles.cache.has(Config.Roles.Whitelist_Staff)) return interaction.reply({content: `Bu işlevi sadece, <@&${Config.Roles.Whitelist_Staff}> yetkisine sahip kişiler kullanabilir.`, ephemeral:true})
                    let iMember = interaction.guild.members.cache.get(iMemberID);
                    let iChannel = client.channels.cache.get(Config.Channels.Information)

                    interaction.message.delete();
                    interaction.channel.send(`**${iMember}** isimli kullanıcının başvurusu, **${interaction.member.displayName}** isimli yetkili tarafından kabul edildi.`);
                    iChannel.send(`**${iMember}** başvurun, **${interaction.member.displayName}** adlı yetkili tarafından kabul edildi.`);
                    iMember.send(`**${iMember}** **${interaction.guild.name}** sunucusunda yaptığın başvurun, **${interaction.member.displayName}** adlı yetkili tarafından kabul edildi.`).catch(e => { });
                    client.guilds.cache.get(interaction.guild.id).members.cache.get(iMember.id).setNickname(`${iName}_${iSurname}`)
                    client.guilds.cache.get(interaction.guild.id).members.cache.get(iMember.id).roles.add(Config.Roles.Whitelist).catch(e => { });
                    client.guilds.cache.get(interaction.guild.id).members.cache.get(iMember.id).roles.remove(Config.Roles.Non_Whitelist).catch(e => { });

                    setTimeout(() => {
                        client.guilds.cache.get(interaction.guild.id).members.cache.get(iMember.id).roles.cache.has(Config.Roles.Whitelist) ? console.log(`${Color.Yellow}[ROL KONTROL] ${Color.Magenta}${iMember.username} ${Color.White}Rol kontrolü başarılı, rolü verilmiş.${Color.Reset}`) : client.guilds.cache.get(interaction.guild.id).members.cache.get(iMember.id).roles.add(Config.Roles.Whitelist)
                        client.guilds.cache.get(interaction.guild.id).members.cache.get(iMember.id).roles.cache.has(Config.Roles.Non_Whitelist) ? client.guilds.cache.get(interaction.guild.id).members.cache.get(iMember.id).roles.remove(Config.Roles.Non_Whitelist) : console.log(`${Color.Yellow}[ROL KONTROL] ${Color.Magenta}${iMember.username} ${Color.White}Rol kontrolü başarılı, rolü alınmış.${Color.Reset}`)
                        client.guilds.cache.get(interaction.guild.id).members.cache.get(iMember.id).setNickname(`${iName}_${iSurname}`)
                      }, 3000)

                } else if(iType === 'dissaprove'){
                    if(!interaction.member.roles.cache.has(Config.Roles.Whitelist_Staff)) return interaction.reply({content: `Bu işlevi sadece, <@&${Config.Roles.Whitelist_Staff}> yetkisine sahip kişiler kullanabilir.`, ephemeral:true})
                    interaction.deferUpdate();
                    
                    let iMember = interaction.guild.members.cache.get(iMemberID);
                    let iChannel = client.channels.cache.get(Config.Channels.Information);

                    var iQuestion = [
                        'Başvuruyu neden reddediyorsunuz, sebebini yazınız. (Bir dakikanız bulunuyor.)'
                      ]
                      var iCounter = 0
                
                      var filter = m => m.author.id === interaction.user.id
                      var iCollector = interaction.channel.createMessageCollector({
                        filter,
                        max: iQuestion.length,
                        time: 1000 * 60,
                        errors: ['time']
                      })
                
                      interaction.channel.send(iQuestion[iCounter++])
                
                      iCollector.on('collect', m => {
                        if(iCounter < iQuestion.length){
                          m.channel.send(iQuestion[iCounter++])
                        }
                      })
                
                      iCollector.on('end', collected => {
                        if(!collected.size) return interaction.channel.send(`Süreniz sona erdi, herhangi bir sebep bildirmediğiniz için başvuru reddedilemedi.`)

                        interaction.message.delete();
                        interaction.channel.send(`${iMember} isimli kullanıcının başvurusu **${interaction.member.displayName}** adlı yetkili tarafından reddedildi. [ Sebebi: **${collected.map(m => m.content).slice(0,1)}** ]`)
                        iChannel.send(`${iMember} isimli kullanıcının başvurusu **${interaction.member.displayName}** adlı yetkili tarafından reddedildi. [ Sebebi: **${collected.map(m => m.content).slice(0,1)}** ]`);
                        iMember.send(`${iMember} **${interaction.guild.name}** sunucusunda yaptığın başvuru, **${interaction.member.displayName}** adlı yönetici tarafından reddedildi. [ Sebebi: **${collected.map(m => m.content).slice(0,1)}** ]`).catch(e => { });
                        collected.forEach(message => {
                            message.delete().catch(console.error);
                          });
                    });

                }
            }
        }
    }

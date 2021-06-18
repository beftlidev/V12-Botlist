const discord = require("discord.js");
const db = require("croxydb");

exports.run = async (client, message, args) => {
  let botlog = db.fetch(`bot.log.${message.guild.id}`);
  if(!botlog) return message.inlineReply('<:codesty_cross:844468546930606100> Bot Log kanalı ayarlı değil!')
  let basvuru = db.fetch(`bot.ekle.log.${message.guild.id}`);
  if(!basvuru) return message.inlineReply('<:codesty_cross:844468546930606100> Bot Ekleme kanalı ayarlı değil!')
  if(message.channel.id !== basvuru) return message.reply(' Lütfen bunu <#'+basvuru+'> kanalında dene!')
  let botid = args[0];
  let botprefix = args[1];
  if(!botid) return message.inlineReply('<:codesty_cross:844468546930606100> Lütfen bir bot ID gir!')
  if(!botprefix) return message.inlineReply('<:codesty_cross:844468546930606100> Lütfen bir bot Prefix gir!')
  let embed = new discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
  .addField("Bot ID", botid, true)
  .addField("Bot Prefix", botprefix, true)
  .setColor("BLUE")
  .setFooter(client.users.cache.get(botid).username+" için istek geldi.")
  let botvaryok = db.fetch(`bot.id.${botid}`)
  if(botid) {
    if(botprefix) {
      if(botvaryok) {
        message.inlineReply('<:codesty_cross:844468546930606100> Bu bot zaten sistemde var!')
      } else {
      if(message.channel.id !== basvuru) return message.reply('<:codesty_cross:844468546930606100> Lütfen bunu <#'+basvuru+'> kanalında dene!')
      if(client.channels.cache.get(basvuru).send(embed));
      if(client.channels.cache.get(botlog).send('<:codesty_check:844468545877442560> ${message.author} adlı kullanıcı <@${botid}> adlı botu sıraya ekledi!`));
      message.inlineReply('<:codesty_check:844468545877442560> Bot ekleme isteğin alındı!')
      db.set(`bot.id.${botid}`, 'yes')
      };
    };
  };
};
exports.help = {
name: "bot-ekle" 
} 

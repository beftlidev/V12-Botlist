const discord = require("discord.js");
const db = require("croxydb");

exports.run = async (client, message, args) => {
 let blue = new discord.MessageEmbed().setColor("BLUE");
  let botlog = db.fetch(`bot.log.${message.guild.id}`);
let sira = db.fetch(`serverData.${message.guild.id}.waitSize`) || 0;
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
  .addField("<:codesty_join:844468549417697350> Bot ID", botid, true)
  .addField("<:codesty_join:844468549417697350> Bot Prefix", botprefix, true)
  .addField("<:codesty_join:844468549417697350> Bot Davet", "<:codesty_join:844468549417697350> Davet: [0 Perm](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0) **|** [8 Perm](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8)") 
  .setColor("BLUE")
  .setFooter("Space Giveaway")
  let botvaryok = db.fetch(`bot.id.${botid}`)
  if(botid) {
    if(botprefix) {
      if(botvaryok) {
        message.inlineReply('<:codesty_cross:844468546930606100> Bu bot zaten sistemde var!')
      } else {
      if(message.channel.id !== basvuru) return message.reply('<:codesty_cross:844468546930606100> Lütfen <#${başvuru}> kanalında bot ekle!')
      if(client.channels.cache.get(basvuru).send(embed));
      if(client.channels.cache.get(botlog).send(blue.setDescription(`<:codesty_check:844468545877442560> Bir bot eklendi!
<:codesty_join:844468549417697350> Bot: ${botid} **|** <@${botid}>
<:codesty_join:844468549417697350> Sahip: ${message.author}
<:codesty_join:844468549417697350> Sıra: ${sira}
<:codesty_join:844468549417697350> Davet: [0 Perm](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0) **|** [8 Perm](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8)`)));
      message.inlineReply('<:codesty_check:844468545877442560> Bot ekleme isteğin alındı!')
      db.set(`bot.id.${botid}`, 'yes')
      db.add(`serverData.${message.guild.id}.waitSize`, 1)
      };
    };
  };
};
exports.help = {
name: "bot-ekle" 
} 

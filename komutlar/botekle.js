const discord = require("discord.js");
const db = require("croxydb");
const { MessageButton } = require("discord-buttons") 

exports.run = async (client, message, args) => {
 let blue = new discord.MessageEmbed().setColor("BLUE");
  let botlog = db.fetch(`bot.log.${message.guild.id}`);
  if(!botlog) return message.inlineReply('<:codesty_cross:844468546930606100> Bot Log kanalı ayarlı değil!')
  let basvuru = db.fetch(`bot.ekle.log.${message.guild.id}`);
  if(!basvuru) return message.inlineReply('<:codesty_cross:844468546930606100> Bot Ekleme kanalı ayarlı değil!')
  if(message.channel.id !== basvuru) return message.reply(' Lütfen bunu <#'+basvuru+'> kanalında dene!')
  let botid = args[0];
  let botprefix = args[1];
  if(!botid) return message.inlineReply('<:codesty_cross:844468546930606100> Lütfen bir bot ID gir!')
  if(!botprefix) return message.inlineReply('<:codesty_cross:844468546930606100> Lütfen bir bot Prefix gir!')

let perm = new MessageButton()
    .setLabel("0 Perm")
    .setURL(`https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0`)
    .setStyle("url"); 

let perm2 = new MessageButton()
    .setLabel("8 Perm")
    .setURL(`https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8`)
    .setStyle("url"); 

  let embed = new discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
  .addField("Bot ID", botid, true)
  .addField("Bot Prefix", botprefix, true)
  .setColor("BLUE")
  .setFooter("Space Giveaway")
  let botvaryok = db.fetch(`bot.id.${botid}`)
  if(botid) {
    if(botprefix) {
      if(botvaryok) {
        message.inlineReply('<:codesty_cross:844468546930606100> Bu bot zaten sistemde var!')
      } else {
      if(message.channel.id !== basvuru) return message.reply('<:codesty_cross:844468546930606100> Lütfen bunu <#'+basvuru+'> kanalında dene!')
      if(client.channels.cache.get(basvuru).send(embed));
      if(client.channels.cache.get(botlog).send(blue.setDescription(`<:codesty_check:844468545877442560> Bir bot eklendi!
Bot: ${botid} **|** <@${botid}> **|** <@\`${botid}\`>
Sahip: ${message.author}
Davet: [0 Perm](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0) **|** [8 Perm](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8)`)),
buttons: [perm, perm2]);
      message.inlineReply('<:codesty_check:844468545877442560> Bot ekleme isteğin alındı!')
      db.set(`bot.id.${botid}`, 'yes')
      };
    };
  };
};
exports.help = {
name: "bot-ekle" 
} 

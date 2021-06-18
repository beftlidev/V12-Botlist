const discord = require("discord.js");
const db = require("croxydb");

exports.run = async (client, message, args) => {
  let blue = new discord.MessageEmbed().setColor("BLUE");
  let red = new discord.MessageEmbed().setColor("RED");
  if(!message.member.hasPermission('ADMINISTRATOR')) {
    return message.channel.send(
      red.setDescription("<:codesty_cross:844468546930606100> Bunu kullanabilmek için `Yönetici` yetkisine ihtiyacın var!")
    );
  }
  let arg = args[0];
  if (!arg) {
    return message.channel.send(
      red.setDescription(
        "<:codesty_cross:844468546930606100> Girebileceğin argümentler: `bot-ekle-kanal` **|** `bot-log-kanal` **|** `onay-red-log-kanal` **|** `bot-yetkili-rol` **|** `sıfırla`"
      )
    );
  } else if (arg == "bot-ekle-kanal") {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      return message.channel.send(
        red.setDescription(
          "<:codesty_cross:844468546930606100> Geçerli bir kanal etiketlemen gerek: **#kanal**"
        )
      );
    }
    db.set(`bot.ekle.log.${message.guild.id}`, kanal.id);
    return message.channel.send(
      blue.setDescription(
        "<:codesty_check:844468545877442560> Bot Ekleme kanalı ayarlandı: <#" +
          kanal +
          ">"
      )
    );
  } else if (arg == "bot-log-kanal") {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      return message.channel.send(
        red.setDescription(
          "<:codesty_cross:844468546930606100> Geçerli bir kanal etiketlemen gerek: **#kanal**"
        )
      );
    }
    db.set(`bot.log.${message.guild.id}`, kanal.id);
    return message.channel.send(
      blue.setDescription(
        "<:codesty_check:844468545877442560> Bot Log kanalı ayarlandı: <#" + kanal + ">"
      )
    );
  } else if (arg == "onay-red-log-kanal") {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      return message.channel.send(
        red.setDescription(
          "<:codesty_cross:844468546930606100> Geçerli bir kanal etiketlemen gerek: **#kanal**"
        )
      );
    }
    db.set(`onay.red.log.${message.guild.id}`, kanal.id);
    return message.channel.send(
      blue.setDescription(
        "<:codesty_check:844468545877442560> Onay-Red kanalı ayarlandı: <#" + kanal + ">"
      )
    );
  } else if (arg == "bot-yetkili-rol") {
    let rol = message.mentions.roles.first();
    if (!rol) {
      return message.channel.send(
        red.setDescription(
          "<:codesty_cross:844468546930606100> Geçerli bir rol etiketlemen gerek: **@rol**"
        )
      );
    }
    db.set(`bot.yetkili.rol.${message.guild.id}`, rol.id);
    return message.channel.send(
      blue.setDescription(
        "<:codesty_check:844468545877442560> Bot Yetkilisi rolü ayarlandı: <@&" +
          rol +
          ">"
      )
    );
  } else if (arg == "bot-yetkili-rol") {
    db.delete(`bot.yetkili.rol.${message.guild.id}`);
    db.delete(`onay.red.log.${message.guild.id}`);
    db.delete(`bot.log.${message.guild.id}`);
    db.delete(`bot.ekle.log.${message.guild.id}`);
    return message.channel.send(
      blue.setDescription(
        "<:codesty_check:844468545877442560> Bot List verileri sıfırlandı!"
      )
    );
};
exports.help = {
name: "botlist" 
} 

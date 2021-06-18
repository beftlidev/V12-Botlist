const discord = require("discord.js");
const db = require("croxydb");

exports.run = async (client, message, args) => {
  let onayred = db.fetch(`onay-red.log.${message.guild.id}`);
  if(!onayred) return message.inlineReply("<:codesty_cross:844468546930606100> Onay-Red log kanalı ayarlı değil!")
  let yetkili = db.fetch(`bot.yetkili.rol.${message.guild.id}`);
  if(!yetkili) return message.inlineReply("<:codesty_cross:844468546930606100> Bot Yetkilisi rolü ayarlı değil!")
  if(!message.member.roles.cache.has(yetkili)) return message.reply("<:codesty_cross:844468546930606100> Bot list yetkilisi değilsin!")
  let botid = args[0];
  if(!botid) return message.inlineReply("<:codesty_cross:844468546930606100> Lütfen bir bot ID gir!")
  let sebep = args.slice(1).join(" ");
  if(!sebep) return message.inlineReply("<:codesty_cross:844468546930606100> Lütfen bir bot red sebebi gir!")
  let botvaryok = db.fetch(`bot.id.${botid}`)
  if(botid) {
    if(!botvaryok) {
      return message.inlineReply("<:codesty_cross:844468546930606100> Sistemde böyle bir bot yok!')
    } else {
      if(client.channels.cache.get(onayred).send('<:codesty_check:844468545877442560> <@"+botid+"> adlı bot <@"+message.author.id+"> tarafından reddedildi!\nSebep: **"+sebep+"**"));
      message.inlineReply('<:codesty_check:844468545877442560> <@"+botid+"> adlı bot reddedildi!")
      db.delete(`bot.id.${botid}`)
    }
  }
};
exports.help = {
name: "bot-reddet" 
} 

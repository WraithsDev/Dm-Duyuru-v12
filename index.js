const Discord = require("discord.js");
const client = new Discord.Client();
var prefix = "+";//istediğiniz gibi ayarlayabilirsiniz prefixi
var statuses = [`Altyapı Videosu İçin youtube.com/@WraithsDev`];
var timers = 2;
const owners = ["1178775055698755598"];//botu kullanmak için sahip_id girmeyi unutmayın

client.on("ready", () => {
  console.log(`Giriş Yapıldı: ${client.user.tag}`);
  client.user.setStatus("dnd");
  var timeing = Math.floor(timers * 1000);
  setInterval(function() {
    var lengthesof = statuses.length;
    var amounter = Math.floor(Math.random() * lengthesof);
    client.user.setActivity(statuses[amounter], { type: "" });
  }, timeing);
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(prefix + "help".toLowerCase())) {
    message.react("🖕🏻");
    let help = new Discord.MessageEmbed()
      .setTimestamp()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        `> Prefix : \`${prefix}\``
      )
      .addFields(
        {
          name: "Komutlar",
          value: `\`${prefix}cd\` , \`${prefix}ocd\`, \`${prefix}ping\``
        }
      );
    message.channel.send(help);
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "cd")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    message.delete();
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let noargs = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(`Error :x:`, `Lütfen duyurmak istediğiniz mesajı yazınız !`)
      .setTimestamp()
    if (!args) return message.channel.send(message.author, noargs);
    message.guild.members.cache
      .filter(m => m.presence.status !== "online")
      .forEach(m => {
        if (m.user.bot) return;
        m.send(`${args}\n ${m}`)
          .then(() => {
            console.log(`Gönderildi : ${m.user.tag} ✅`);
          })
          .catch(function() {
            console.log(`Gönderilemedi : ${m.user.tag} ❌ `);
          });
      });
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `📬 : Mesajınız toplam online : \`${message.guild.members.cache.filter(
          m => m.presence.status !== "online"
        ).size
        }\` kişiye gönderildi ! `
      )
      .setTimestamp()
    message.channel
      .send(`Mesaj tüm Online üyelere gönderildi...(biraz zaman alabilir)`)
      .then(me => {
        me.edit(message.author, embed);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "ocd")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    message.delete();
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let noargs = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(`Error :x:`, `Lütfen duyurmak istediğiniz mesajı yazınız!`)
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    if (!args) return message.channel.send(message.author, noargs);
    message.guild.members.cache
      .filter(m => m.presence.status !== "offline")
      .forEach(m => {
        if (m.user.bot) return;
        m.send(`${args}\n ${m}`)
          .then(() => {
            console.log(`Gönderildi : ${m.user.tag} ✅`);
          })
          .catch(function() {
            console.log(`Gönderilemedi : ${m.user.tag} ❌ `);
          });
      });
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `📬 : Mesajınız toplam offline : \`${message.guild.members.cache.filter(
          m => m.presence.status !== "offline"
        ).size
        }\` kişiye gönderildi ! `
      )
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel
      .send(`Offline Üyelere Mesajı Gönderiyorum... (biraz zaman alabilir)`)
      .then(me => {
        me.edit(message.author, embed);
      });
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("Pinging..").then(m => {
      m.edit(
        `\`\`\`javascript\nDiscord Bot : ${Math.round(
          client.ws.ping
        )} ms\n\`\`\` `
      );
    });
  }
});

client.login(`MTE4NTcwNjIwODU5ODk2MjM2Nw.GGp9lS.S1-FK_LWF0VbJRswKkb7mBUHL4ky5Gd_giFwDc`);

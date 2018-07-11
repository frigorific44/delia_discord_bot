const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  let guildIcon = message.guild.iconURL;
  let guildEmbed = new Discord.RichEmbed()
  .setColor(client.settings.botColor)
  .setThumbnail(guildIcon)
  .setTitle(`${message.guild.name}`)
  .addBlankField()
  .addField('Owner', message.guild.owner)
  .addField('Created On', message.guild.createdAt)
  .addField('Total Members', message.guild.memberCount)
  .addField('Server Region', message.guild.region);
  message.channel.send(guildEmbed);
};

module.exports.help = 'Provides various information on the current server.';

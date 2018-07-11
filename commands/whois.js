const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  let who = message.guild.member(message.mentions.users.first());
  if (!who) {
    message.channel.send('I must know whom you ask about to tell you about them.');
  }
  else {
    let whoAvatar = who.user.avatarURL;
    let whoEmbed = new Discord.RichEmbed()
    .setColor(who.displayHexColor)
    .setThumbnail(whoAvatar)
    .addField('Username', who.user.username);
    if (who.nickname) {
      whoEmbed.addField('Nickname', who.nickname);
    }
    whoEmbed.addField('User ID', who.id)
    .addField('Joined Server', who.joinedAt)
    .addField('Status', who.presence.status);

    message.channel.send(whoEmbed);
  }
};

module.exports.help = 'Provides various information about first @-mentioned user.';

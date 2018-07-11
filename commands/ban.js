const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  //ban @user reason
  if (!message.member.hasPermission('BAN_MEMBERS', false, true, true)) {
    message.channel.send('You have insufficient authority; I cannot complete this task.');
    return;
  }

  let kUser = message.guild.member(message.mentions.users.first());
  if (!kUser) {
    return message.channel.send('It would seem no user was mentioned to ban.');
  }
  if (kUser.highestRole.comparePositionTo(message.member.highestRole) >= 0) {
    return message.channel.send('You have insufficient authority; I cannot complete this task.');
  }
  if (kUser.user.equals(client.user)) {
    return message.channel.send('I will not allow you to use my infrastructure for this task.');
  }

  let bReason = args.join(' ').slice(22);

  let banEmbed = new Discord.RichEmbed()
  .setColor(settings.botColor)
  .setDescription('Ban')
  .addField('Banner User', `${kUser} with ID: ${kUser.id}`)
  .addField('Banned By', `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField('Channel', message.channel)
  .addField('Time', message.createdAt)
  .addField('Reason', rReason)

  let banChannel = message.guild.channels.find(`name`, 'incidents');
  if (!banChannel) {
    let reportsChannel = message.guild.channels.find(`name`, "reports");
    if (!reportsChannel) {
      message.channel.send('I was unable to find an \'incidents\' channel, nor could I locate a \'reports\' channel.');
    }
    else {
      reportsChannel.send(banEmbed);
    }
  }
  else {
    banChannel.send(banEmbed);
  }

  message.guild.member(kUser).ban(kReason);
}

module.exports.help = 'Will ban the mentioned player and document the incident if possible.'

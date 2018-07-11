const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  //kick @user reason
  if (!message.member.hasPermission('KICK_MEMBERS', false, true, true)) {
    message.channel.send('You have insufficient authority; I cannot complete this task.');
    return;
  }

  let kUser = message.guild.member(message.mentions.users.first());
  if (!kUser) {
    return message.channel.send('It would seem no user was mentioned to kick.');
  }
  if (kUser.highestRole.comparePositionTo(message.member.highestRole) >= 0) {
    return message.channel.send('You have insufficient authority; I cannot complete this task.');
  }
  if (kUser.user.equals(client.user)) {
    return message.channel.send('I will not allow you to use my infrastructure for this task.');
  }

  let kReason = args.join(' ').slice(22);

  let kickEmbed = new Discord.RichEmbed()
  .setColor(settings.botColor)
  .setDescription('Kick')
  .addField('Kicked User', `${kUser} with ID: ${kUser.id}`)
  .addField('Kicked By', `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField('Channel', message.channel)
  .addField('Time', message.createdAt)
  .addField('Reason', rReason)

  let kickChannel = message.guild.channels.find(`name`, 'incidents');
  if (!kickChannel) {
    let reportsChannel = message.guild.channels.find(`name`, "reports");
    if (!reportsChannel) {
      message.channel.send('I was unable to find an \'incidents\' channel, nor could I locate a \'reports\' channel.');
    }
    else {
      reportsChannel.send(kickEmbed);
    }
  }
  else {
    kickChannel.send(kickEmbed);
  }

  message.guild.member(kUser).kick(kReason);
}

module.exports.help = 'Will kick the mentioned player and document the incident if possible.'

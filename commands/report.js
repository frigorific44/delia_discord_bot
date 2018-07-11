const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first());
  if (!rUser) {
    message.channel.send('It must be something serious if it needed reporting, but unfortunately I was unable to locate any @-mentioned user.');
  }
  else {
    let rReason = args.join(' ').slice(22);
    if (!rReason) {
      message.channel.send('Please provide a reason.');
    }
    else {
      let reportEmbed = new Discord.RichEmbed()
      .setColor(client.settings.botColor)
      .setDescription('Report')
      .addField('Reported User', `${rUser} with ID: ${rUser.id}`)
      .addField('Reported By', `${message.author} with ID: ${message.author.id}`)
      .addField('Channel', message.channel)
      .addField('Time', message.createdAt)
      .addField('Reason', rReason);

      let reportsChannel = message.guild.channels.find(`name`, 'reports');
      if (!reportsChannel) {
        message.channel.send('I could not find a reports channel.')
      }
      else {
        message.delete().catch(O_o=>{});
        reportsChannel.send(reportEmbed);
      }
    }
  }
};

module.exports.help = 'Sends back a \'pong!\' with the sent and received times.';

const Discord = require('discord.js');

let off =  ['off', 'none','0','nobody'];
let half = ['half','some','1','withoutrole'];
let full = ['full','all', '2','everybody'];

module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission('', false, true, true)) {
    message.channel.send('Oh dear, it seems that you have insufficient authority.');
  }
  else {
    if (!args[0]) {
      message.channel.send('You have not provided an argument.');
    }
    else {

      let reason = args.slice(1).join(' ');

      if (off.includes(args[0].toLowerCase())) {
        message.guild.setExplicitContentFilter(0, reason);
        message.channel.send('Explicit content filter set to: \'Do not scan any messages\'');
      }
      else if (half.includes(args[0].toLowerCase())) {
        message.guild.setExplicitContentFilter(1, reason);
        message.channel.send('Explicit content filter set to: \'Scan messages from users without a role\'');
      }
      else if (full.includes(args[0].toLowerCase())) {
        message.guild.setExplicitContentFilter(2, reason);
        message.channel.send('Explicit content filter set to: \'Scan messages sent by all members\'');
      }
      else {
        message.channel.send('That appears to be an invalid argument.');
      }
    }
  }
};

module.exports.help = '';

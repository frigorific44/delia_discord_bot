const Discord = require('discord.js');
// TODO: rename to just 'Verification'?
let none = ['none', '0'];
let low =  ['low','1'];
let medium = ['medium','2'];
let high = ['high', '3'];
let highest = ['highest','4'];

module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD', false, true, true)) {
    message.channel.send('Oh dear, it seems that you have insufficient authority.');
  }
  else if (/*bot permission*/false) {
    return;
  }
  else {
    if (!args[0]) {
      message.channel.send('You have not provided an argument.');
    }
    else {

      let reason = args.slice(1).join(' ');

      if (none.includes(args[0].toLowerCase())) {
        message.guild.setVerificationLevel(0, reason);
        message.channel.send('Verification level set to: none');
      }
      else if (low.includes(args[0].toLowerCase())) {
        message.guild.setVerificationLevel(1, reason);
        message.channel.send('Verification level set to: low');
      }
      else if (medium.includes(args[0].toLowerCase())) {
        message.guild.setVerificationLevel(2, reason);
        message.channel.send('Verification level set to: medium');
      }
      else if (high.includes(args[0].toLowerCase())) {
        message.guild.setVerificationLevel(3, reason);
        message.channel.send('Verification level set to: high');
      }
      else if (highest.includes(args[0].toLowerCase())) {
        message.guild.setVerificationLevel(4, reason);
        message.channel.send('Verification level set to: highest')
      }
      else {
        message.channel.send('That appears to be an invalid argument.');
      }
    }
  }
};

module.exports.help = '';

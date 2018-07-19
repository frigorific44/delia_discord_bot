const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  let server = client.servers[message.guild.id];

  if (message.guild.voiceConnection) {
    message.guild.voiceConnection.disconnect();
  }
}

module.exports.help = '';

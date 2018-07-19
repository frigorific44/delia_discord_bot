const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  let server = client.servers[message.guild.id];

  if(server && server.dispatcher) {
    server.dispatcher.end();
  }
}

module.exports.help = '';

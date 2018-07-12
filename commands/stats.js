const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  message.channel.send(`I am connected to ${client.guilds.size} servers,` +
                       ` ${client.channels.size} channels,` +
                       ` and ${client.users.size} users.`);
};

module.exports.help = '';

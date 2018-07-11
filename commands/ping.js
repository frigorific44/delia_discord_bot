const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  let currTime = new Date();
  message.channel.send(`pong! Message sent at ${message.createdAt} and received at ${currTime}.`);
};

module.exports.help = 'Sends back a \'pong!\' with the sent and received times.';

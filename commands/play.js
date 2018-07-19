const Discord = require('discord.js');
const ytdl = require('ytdl-core');

function play(client, message, connection) {
  let server = client.servers[message.guild.id];

  server.dispatcher = connection.playStream(ytdl(server.playQueue[0], {filter: 'audioonly'}));
  server.playQueue.shift();

  server.dispatcher.on("end", () => {
    if (server.playQueue[0]) play(client, message, connection);
    else connection.disconnect();// IDEA: delayed disconnect so if song added soon, no in and out of voice channel
  });
}

module.exports.run = (client, message, args) => {
  if (!args[0]) {
    message.channel.send('You have not provided anything to play.');
    return;
  }
  else if (!message.member.voiceChannel) {
    message.channel.send('You need to be in a voice channel so I can send patterns of sound into your ears.');
    return;
  }
  else {
    // IDEA: Add option for something that looks like a link but is invalid (might message that link is invalid)
    if (!client.servers[message.guild.id]) {
      client.servers[message.guild.id] = {
        playQueue : []
      }
    }
    else if (!client.servers[message.guild.id].playQueue) {
      client.servers[message.guild.id].playQueue = [];
    }

    if (ytdl.validateURL(args[0])) {
      client.servers[message.guild.id].playQueue.push(args[0]);
      if(!message.guild.voiceConnection) {
        message.member.voiceChannel.join().then( connection => {
          play(client, message, connection);
        });
      }
      else {
        play(message.guild.voiceConnection, message);
      }
    }
    else {
      //Search the args and take the first result
      // // IDEA: Allow servers to set a default preferred search, like Soundcloud instead of YouTube
      return;
    }
  }
};

module.exports.help = '';

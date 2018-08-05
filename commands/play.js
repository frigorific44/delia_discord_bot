const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const music = require('../music.js');


module.exports.run = (client, message, args) => {
  if (!args[0]) {
    message.channel.send('You have not provided anything to play.').catch(console.error);
    return;
  }
  else if (!message.member.voiceChannel) {
    message.channel.send('You need to be in a voice channel so I can send patterns of sound into your ears.');
    return;
  }
  else {
    // IDEA: Add option for something that looks like a link but is invalid (might message that link is invalid)
    let server = client.servers.get(message.guild.id);
    if (!server) {
      client.servers.set(message.guild.id, {
        playQueue: []
      });
    }
    else if (!server.playQueue) {
      server.playQueue = [];
    }

    function playContext(link) {
      if (ytdl.validateURL(link)) return 'yt';

      else return 'other';
    }

    switch (playContext(args[0])) {
      case 'yt':
        music.enqueuePlayEntry(client, message, new music.PlayEntry(args[0], 'yt'));
        break;

      default:
        client.youtube.search.list({
          part: 'id',
          q: args.join(' '),
          maxResults: 1
        }).then( res => {
          music.enqueuePlayEntry(client, message, new music.PlayEntry(`https://youtu.be/${res.data.items[0].id.videoId}`, 'yt'));
        }).catch(console.error);
    }
  }
};

module.exports.help = '';

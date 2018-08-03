const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const music = require('../music.js');

// function play (client, message, connection) {
//   let server = client.servers[message.guild.id];
//
//   let url = server.playQueue[0];
//   let stream = ytdl(url, {filter: 'audioonly'});
//
//   stream.on('info', (info) => {
//     let ytEmbed = new Discord.RichEmbed();
//     let name = message.member.nickname ? message.member.nickname : message.author.username;
//
//     ytEmbed.setThumbnail(info.thumbnail_url)
//     .setURL(url)
//     .setTitle(`${info.title}`)
//     .addField(`${info.author.name}`,'\u200B')
//     .addField('\u200B', getHHMMSS(info.length_seconds), true)
//     .addField('Requested by:', name, true);
//
//     message.channel.send(ytEmbed);
//   });
//
//   server.dispatcher = connection.playStream(stream);
//   server.playQueue.shift();
//
//   server.dispatcher.on("end", () => {
//     if (server.playQueue[0]) play(client, message, connection);
//     else connection.disconnect();// IDEA: delayed disconnect so if song added soon, no in and out of voice channel
//   });
// }

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

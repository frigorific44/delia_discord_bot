const Discord = require('discord.js');
const ytdl = require('ytdl-core');

function getHHMMSS (sec_num) {
  let hours   = Math.floor(sec_num / 3600) % 24;
  let minutes = Math.floor(sec_num / 60) % 60;
  let seconds = sec_num % 60;
  return [hours,minutes,seconds]
    .map(v => v < 10 ? "0" + v : v)
    .filter((v,i) => v !== "00" || i > 0)
    .join(":");
}

function play (client, message, connection) {
  let server = client.servers[message.guild.id];

  let url = server.playQueue[0];
  let stream = ytdl(url, {filter: 'audioonly'});

  stream.on('info', (info) => {
    let ytEmbed = new Discord.RichEmbed();

    ytEmbed.setThumbnail(info.thumbnail_url)
    .setURL(url)
    .setTitle(`${info.title}`)
    .addField(`${info.author.name}`,'\u200B')
    .addField('\u200B', getHHMMSS(info.length_seconds), true)
    .addField('Requested by:', message.member.nickname, true);

    message.channel.send(ytEmbed);
  });

  server.dispatcher = connection.playStream(stream);
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
        play(client, message, message.guild.voiceConnection);
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

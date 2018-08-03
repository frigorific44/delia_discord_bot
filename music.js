const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const getHHMMSS = require('./utility.js').getHHMMSS;

module.exports.PlayEntry = class PlayEntry {
  constructor (link, source) {
    this._link = link;
    this._source = source;
  }

  get link() {
    return this._link;
  }

  get source() {
    return this._source;
  }
}

function getYTPlayEmbed(info, message) {
  let ytEmbed = new Discord.RichEmbed()
  .setThumbnail(info.thumbnail_url)
  .setURL('https://youtu.be/' + info.video_id)
  .setTitle(info.title)
  .addField(info.author.name,'\u200B')
  .addField('\u200B', getHHMMSS(info.length_seconds), true)
  .addField('Requested by:', message.member.nickname ? message.member.nickname : message.author.username, true);

  return ytEmbed;
}

function getStream(qEntry) {
  switch (qEntry.source) {
    case 'yt':
      return ytdl(qEntry.link, {filter: 'audioonly'});
      break;
    default:
      throw new Error("This is an invalid queue entry and the stream cannot be retrieved, as the source is unknown.")
  }
}

module.exports.enqueuePlayEntry = (client, message, entry) => {
  client.servers.get(message.guild.id).playQueue.push(entry);
  if(!message.guild.voiceConnection) {
    message.member.voiceChannel.join().then( connection => {
      play(client, message, connection);
    });
  }
}

function play (client, message, connection) {
  let server = client.servers.get(message.guild.id);
  let stream = getStream(server.playQueue[0]);

  stream.on('info', (info) => {
    message.channel.send(getYTPlayEmbed(info, message))
  });

  server.dispatcher = connection.playStream(stream);
  server.playQueue.shift();

  server.dispatcher.on("end", () => {
    if (server.playQueue[0]) play(client, message, connection);
    else connection.disconnect();// IDEA: delayed disconnect so if song added soon, no in and out of voice channel
  });
}

module.exports.play = play;

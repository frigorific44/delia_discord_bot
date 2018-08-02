const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const getHHMMSS = require('./utility.js').getHHMMSS;

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

module.exports.play = {
  yt (client, message, connection) {
    let server = client.servers[message.guild.id];
    let stream = ytdl(server.playQueue[0], {filter: 'audioonly'});

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
}

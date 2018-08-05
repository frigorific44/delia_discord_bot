const Discord = require('discord.js');
const RC = require('reaction-core');
const RM = require('reaction-menu');
const music = require('../music.js');

const MAX_SEARCH_RESULTS = 5;
const NUM_EMOJI = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"];

let makeSearchBtns = (client, msg, results) => {
  const buttons = [];
  for (let n=1;n<=MAX_SEARCH_RESULTS;n++) {
    buttons.push({
      emoji: NUM_EMOJI[n],
      run: (user, message) => {
        music.enqueuePlayEntry(client, msg, new music.PlayEntry('https://youtu.be/'+results.data.items[n].id.videoId, 'yt'));
      }
    })
  }
  return buttons
}

module.exports.run = async (client, message, args) => {
  let server = client.servers.get(message.guild.id);
  if (!server) {
    client.servers.set(message.guild.id, {
      playQueue: []
    });
  }
  else if (!server.playQueue) {
    server.playQueue = [];
  }

  let query = args.join(' ');

  let results = await client.youtube.search.list({
    part: 'id, snippet',
    type: 'video',// TODO: allow for playlist as well
    q: query,
    maxResults: MAX_SEARCH_RESULTS
  }).catch(console.error)

  let orderedList = '\u200B'
  results.data.items.forEach( (item, index) => {
    orderedList += `${index+1}. ${item.snippet.title}\n`
  });

  let page = {
    title: 'Search for: ' + query,
    url: 'https://www.youtube.com/results?search_query=' + args.join('+'),
    fields: [
      {
        name: 'Results',
        value: orderedList
      }
    ]
  }

  let menu = new RM.Menu(message.channel, client.rHandler, { RM: { disable: { left: true , right: true}}, RC: { owner: message.author.id } });
  let btns = makeSearchBtns(client, message, results);
  await menu.add(page).catch(console.error);
  menu.send(btns).catch(console.error);
};

module.exports.help = '';

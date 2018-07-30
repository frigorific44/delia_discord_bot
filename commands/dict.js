const Discord = require('discord.js');
const Dictionary = require("oxford-dictionary");



module.exports.run = (client, message, args) => {
  if (!args[0]) {
    message.channel.send('Would you mind actually providing me a word to lookup?');
  }
  else {
    let dict = new Dictionary({
      app_id : client.auth.oxford.id,
      app_key : client.auth.oxford.key,
      source_lang : "en"
    });

    var lookup = dict.find(args[0]);

    lookup.then( res => {
      let defEmbed = new Discord.RichEmbed();
      defEmbed.addField(`*${res.results[0].word}*`, '\u200B');// IDEA: setAuthor may prove better

      res.results[0].lexicalEntries.forEach( category => {
        let def_body = '\u200B';
        let def_num = 1;
        category.entries.forEach( entry => {
          entry.senses.forEach( sense => {
            if (sense.definitions) {
              def_body += `__${def_num}__` + '. ' + sense.definitions[0] + '\n';
              def_num++;
            }
          });
        });

        defEmbed.addField(category.lexicalCategory, def_body);
      });

      message.channel.send(defEmbed);
    }).catch( err => {
      if (err == 'No such entry found.') {
        message.channel.send('Sorry, no such entry was found.')
      }
      else if (err.status_code === 500) {
        message.channel.send('An error occurred while processing the data. What did you do?')
      }
      console.error(err);
    });
  }
}

module.exports.help = '';

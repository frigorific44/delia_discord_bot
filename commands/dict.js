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

    lookup.then( (res, err) => {
      if (err) {
        //console.log(err);
      }
      else {
        let defEmbed = new Discord.RichEmbed();
        defEmbed.addField(`*${res.results[0].word}*`, '\u200B');// IDEA: setAuthor may prove better

        res.results[0].lexicalEntries.forEach( category => {
          let def_body = '\u200B';
          let def_num = 1;
          category.entries.forEach( entry => {
            entry.senses.forEach( sense => {
              def_body += `__${def_num}__` + '. ' + sense.definitions[0] + '\n';
              def_num++;
            });
          });

          defEmbed.addField(category.lexicalCategory, def_body);
          //console.log(category);
        });

        message.channel.send(defEmbed);
      }
    });
  }
}

module.exports.help = '';

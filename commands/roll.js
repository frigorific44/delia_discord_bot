const Discord = require('discord.js');
// IDEA: name is dice.js instead?
module.exports.run = async (client, message, args) => {
  if (!args[0]) {
    message.channel.send('I must know the number of sides you wish for before I can summon a die to roll.');
  }
  else {
    let sides = parseInt(args[0], 10);
    if (!sides) {
      message.channel.send('It would seem you provided me with something which is not a number...');
    }
    else {
      let result = Math.floor((Math.random() * sides) + 1);
      message.channel.send(`You rolled a ${result}.`);
    }
  }
};

module.exports.help = '';

const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (args[1]) {
    return message.channel.send('While I am omnipresent in this space, I still can only hug one entity at a time. Sorry.');
  }
  else if (args[0]) {
    let hugs = [
      `ʕっ•ᴥ•ʔっ ${args[0]}`,
      `(.づσ▿σ)づ. ${args[0]}`,
      `c⌒っ╹v╹ )っ ${args[0]}`,
      `(っ´▽｀)っ ${args[0]}`,
      `${args[0]} ⊂(・ヮ・⊂)`,
      `${args[0]} ⊂(･ω･*⊂)`,
      `(つ▀¯▀)つ ${args[0]}`,
      `(づ￣ ³￣)づ ${args[0]}`,
      `(つ´∀｀)つ ${args[0]}`
    ];
    return message.channel.send(hugs[Math.floor(Math.random() * hugs.length)]);
  }
  else {
    return message.channel.send('There is no one to hug. What cruelty is this?')
  }
};

module.exports.help = 'DELIA will offer a cold cyberspace hug.';

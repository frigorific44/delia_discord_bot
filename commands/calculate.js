const Discord = require('discord.js');
const math = require('mathjs');
const limitedEval = math.eval;
// TODO: cover security issues
math.import({
  'import':     function () { throw new Error('Function import is disabled') },
  'createUnit': function () { throw new Error('Function createUnit is disabled') },
  'eval':       function () { throw new Error('Function eval is disabled') },
  'parse':      function () { throw new Error('Function parse is disabled') },
  'simplify':   function () { throw new Error('Function simplify is disabled') },
  'derivative': function () { throw new Error('Function derivative is disabled') }
}, {override: true})

module.exports.run = (client, message, args) => {
  if (!args[0]) {

  }
  expression = args.join(' ');
  //result = limitedEval(expression);
  message.channel.send(`= ${result}`);
};

module.exports.help = '';

const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  // TODO: Permission check so only developers can invoke the command
  if (args[0]) {
    args.forEach( cmd => {
      if (client.commands.has(cmd)) {
        delete require.cache[require.resolve(`./${cmd}.js`)];
        let props = require(`./${cmd}.js`);
        client.commands.set(cmd, props);
        message.channel.send(`The command ${cmd} has been reloaded.`);
      }
    });
  }
  else {
    client.commands.forEach( (a, name) => {
      delete require.cache[require.resolve(`./${name}.js`)];
      let props = require(`./${name}.js`);
      client.commands.set(name, props);
    });
    message.channel.send('Commands loaded.');
  }
};

module.exports.help = '';// TODO:

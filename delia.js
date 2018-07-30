const Discord = require('discord.js');
const fs = require('fs');
const {google} = require('googleapis');

const settings = require('./settings.json');

const client = new Discord.Client({disabledEvents: ['TYPING_START']});// TODO: disable unnecessary events in the options for performance
client.auth = require('./auth.json');
client.commands = new Discord.Collection();
client.settings = settings;
client.servers = {};

const youtube = google.youtube({
  version: 'v3',
  auth: client.auth.google.yt_key
});
client.youtube = youtube


fs.readdir('./commands/', (err, files) => {

  if(err) console.log(err);

  let jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) {
    console.log("Could not find any commands.");
    return;
  }

  jsFiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(f.split('/').pop().split('.').shift(), props);
  });
});

client.on('ready', () => {
  console.log(`${client.user.username} is ready and online!`);
  client.user.setActivity('Global Thermonuclear War', {type: 'PLAYING'});
  //client.user.setActivity('Pinky and the Brain', {type: 'WATCHING'});
  //client.user.setActivity('consciousness', {type: 'STREAMING'});
});

//event listener for messages
client.on('message', async message => {
  //if message is from bot client, ignore
  if (message.author.equals(client.user)) return;
  //if message is a direct message, ignore
  if (message.channel.type === 'dm') return;
  //if message does not start with the client's prefix, ignore
  if (!message.content.startsWith(settings.PREFIX)) return;
  //if unable to reply in channel, ignore
  if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;

  let args = message.content.substring(settings.PREFIX.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();

  let cmdFile = client.commands.get(cmd);
  if (cmdFile) {
    cmdFile.run(client, message, args);
  }
});

client.on('warn', info => {
  console.log(info);
});

//Log the bot in
client.login(client.auth.discord.token);

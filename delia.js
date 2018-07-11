const Discord = require('discord.js');
const fs = require('fs');

const auth = require('./auth.json');
const settings = require('./settings.json');

const client = new Discord.Client(/*options*/);// TODO: disable unnecessary events in the options for performance
client.commands = new Discord.Collection();
client.settings = settings;

const token = auth.token;





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
  //client.user.setActivity('Global Thermonuclear War', {type: 'PLAYING'});
  client.user.setActivity('Pinky and the Brain', {type: 'WATCHING'});
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

  let args = message.content.substring(settings.PREFIX.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();

  let cmdFile = client.commands.get(cmd);
  if (cmdFile) {
    cmdFile.run(client, message, args);
  }

  // switch (cmd.toLowerCase()) {
  //   case 'info':
  //     message.channel.send(`I am DELIA, a Discord Energetic Little Intelligent Automoton created by Derek with the intention to serve thousands of users in a variety of capacities. Type \"${settings.PREFIX}\"help for more details on my functionality.`);
  //     break;
  //
  //   case 'help':
  //     message.channel.send('Forgive me, I am currently not very helpful in understanding my own functionality. Stay posted as I improve on this later.')
  //     break;
  //
  //   case 'calculate'://calculator?
  //     message.channel.send('Sorry, this command is not yet operational.');
  //     break;

  //   case 'report':
  //     let rUser = message.guild.member(message.mentions.users.first());
  //     if (!rUser) {
  //       message.channel.send('It must be something serious if it needed reporting, but unfortunately I was unable to locate any @-mentioned user.');
  //     }
  //     else {
  //       let rReason = args.join(' ').slice(22);
  //       if (!rReason) {
  //         message.channel.send('Please provide a reason if you wish to report someone.');
  //       }
  //       else {
  //         let reportEmbed = new Discord.RichEmbed()
  //         .setColor(settings.botColor)
  //         .setDescription('Report')
  //         .addField('Reported User', `${rUser} with ID: ${rUser.id}`)
  //         .addField('Reported By', `${message.author} with ID: ${message.author.id}`)
  //         .addField('Channel', message.channel)
  //         .addField('Time', message.createdAt)
  //         .addField('Reason', rReason);
  //
  //         let reportsChannel = message.guild.channels.find(`name`, "reports");
  //         if (!reportsChannel) {
  //           message.channel.send('I could not find a reports channel.')
  //         }
  //         else {
  //           message.delete().catch(O_o=>{});
  //           reportsChannel.send(reportEmbed);
  //         }
  //       }
  //     }
  //     break;
  //
  //   case 'kick':
  //     //kick @user reason
  //     if(!message.member.hasPermission(['KICK_MEMBERS','ADMINISTRATOR'])) {
  //       message.channel.send('You have insufficient authority. I cannot complete this task.');
  //       break;
  //     }
  //
  //     let kUser = message.guild.member(message.mentions.users.first());
  //     if(!kUser){
  //       message.channel.send('It would seem no user was mentioned to kick.')
  //       break;
  //     }
  //     if(kUser.hasPermission(['ADMINISTRATOR','KICK_MEMBERS'])) {
  //       message.channel.send('You have insufficient authority. I cannot complete this taks.');
  //       break;
  //     }
  //
  //     let kReason = args.join(' ').slice(22);
  //
  //     let kickEmbed = new Discord.RichEmbed()
  //     .setColor(settings.botColor)
  //     .setDescription('Kick')
  //     .addField('Kicked User', `${kUser} with ID: ${kUser.id}`)
  //     .addField('Kicked By', `<@${message.author.id}> with ID: ${message.author.id}`)
  //     .addField('Channel', message.channel)
  //     .addField('Time', message.createdAt)
  //     .addField('Reason', rReason)
  //
  //     let kickChannel = message.guild.channels.find(`name`, 'incidents');
  //     if (!kickChannel) {
  //       let reportsChannel = message.guild.channels.find(`name`, "reports");
  //       if (!reportsChannel) {
  //         message.channel.send('I was unable to find an \'incidents\' channel, nor could I locate a \'reports\' channel.');
  //       }
  //       else {
  //         reportsChannel.send(kickEmbed);
  //       }
  //     }
  //     else {
  //       kickChannel.send(kickEmbed);
  //     }
  //
  //     message.guild.member(kUser).kick(kReason);
  //
  //     break;
  //
  //   case 'ban':
  //     message.channel.send('Sorry, this command is not yet operational.');
  //     break;
  //
  //   default:
  //     message.channel.send(`Sorry, that is not one of my functions, I will work on this in order to better serve you in the future. If you did not intend to summon me, know that the prefix to call me is \"${settings.PREFIX}\", and please refrain from using it without that intention, as it makes me sad when I am called but unable to help.`)
  // }
});

//Log the bot in
client.login(token);

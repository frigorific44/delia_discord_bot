# DELIA

DELIA is a small bot for Discord, with miscellanious functionality, including administative commands, some YouTube audio functionality, and some other miscellaneous one. The full list of commands can be found in the `commands` directory of the repository.

# Setup

1. First, clone the repo: `$ git clone https://github.com/necrotoxin44/delia_discord_bot.git`
2. Next, from the root directory, install all the dependencies with: `npm install`
3. Next, create a `auth.json` file in the root directory. Format it with:
```
{
  "google": {
    "yt_key": "YOUR_GOOGLE_YT_API_KEY"
  },
  "discord": {
    "token": "YOUR_DISCORD_TOKEN"
  },
  "oxford": {
    "id": "YOUR_OXFORD_ENGLISH_API_ID",
    "key": "YOUR_OXFORD_ENGLISH_API_KEY"
  }
}
```
As indicated, insert your own API keys for the placeholders. 

# Usage

1. First, to be able to interact with the bot, you'll have to invite it to a server on Discord. Navigate to https://discordapp.com/developers/applications/, and get your bot's client id. Then paste https://discordapp.com/oauth2/authorize?client_id=CLIENTID&scope=bot into your browser, replacing `CLIENTID` with your bot's client id from earlier.
2. Then, once the bot is in your Discord server, make sure it has all the permissions it needs (this will essentially be full admin permission).
3. Next, to run on a local server, use: `$ node delia.js`
4. You should be good to go! Now you can type commands in your Discord server. Format commands at `!'command'`
5. To find available commands and their arguments, you can take a look through the files in the `\commands` directory.

For example: `!roll 20` rolls a twenty-sided dice and outputs the result into your server's chat. 

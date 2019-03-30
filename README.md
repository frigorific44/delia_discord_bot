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

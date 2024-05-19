# TikTok-WatchParty-ForDiscord
Ever wanted to spam TikToks to a Discord chat with your friends and get to watch them together? Well not you can!

----

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](/LICENSE)

You will find 2 components of this project.
1) DiscordBot
2) BrowserExtension

## Get Things Running
#### 1. Discord Bot
Go through [Discord documentation](https://discord.com/developers/docs/quick-start/getting-started) for setting up a bot on your server.
Put in your bot token in the config.json file.
```json
{
    "token": "your-token-goes-here"
}
```
Run the bot with `node index.js` and keep it open. The bot will react with a "👍" to any message that starts with a TikTok link and save it.
"//check" will get the bot to text to that text channel with who sent how many TikToks and "//checkpoint" will also attatch a JSON file and clear the bot memory.

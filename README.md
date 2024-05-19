# TikTok-WatchParty-ForDiscord
Ever wanted to spam TikToks to a Discord chat with your friends and get to watch them together? Well not you can!

----

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](/LICENSE)

You will find 2 components of this project.
1) DiscordBot
2) BrowserExtension

## Get Things Running
### Discord Bot
1) Go through [Discord documentation](https://discord.com/developers/docs/quick-start/getting-started) for setting up a bot on your server.
2) Put in your bot token in the config.json file.
```json
{
    "token": "your-token-goes-here"
}
```
3) Run the bot with `node index.js` and keep it open. The bot will react with a "👍" to any message that starts with a TikTok link and save it.
4) "//check" will get the bot to text to that text channel with who sent how many TikToks and "//checkpoint" will also attatch a JSON file and clear the bot memory.

### Browser Extension
1) Go through [Google documentation](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) for installing custom extensions.
2) Download the JSON from the Discord bots message. In the extension menu open this extension and find the JSON you downloaded to innitiate.
3) The bot will open TikTok and you will find a small panel on the left to go through all the TikToks that were sent.
4)  Stream your browser on Discord or whatever streaming platform you'd like!

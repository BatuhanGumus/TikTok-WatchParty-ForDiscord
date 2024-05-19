# TikTok-WatchParty-ForDiscord
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](/LICENSE)

Ever wanted to spam TikToks to a Discord chat with your friends and get to watch them together? Well now you can!

 ![Discord Reaction](/docs/watch.JPG)
----


## Features
You will find 2 components of this project.
1) [Discord Bot](/DiscordBot)
    - Keeps the TikToks sent and gives them to you via JSON.
2) [Browser Extension](/BrowserExtension)
    - Allows you to go through the sent TikToks with ease.
    - See the comment the person made with the TikTok they sent.
    - Randomize the list in case a person sent too many back to back.
    - Can hide who sent it if you want to guess.


## Get Things Running
### Discord Bot
1) Go through [Discord documentation](https://discord.com/developers/docs/quick-start/getting-started) for setting up a bot on your server.
2) Put in your bot token in the [config.json](/DiscordBot/config.json) file.
    ```json
    {
        "token": "your-token-goes-here"
    }
    ```
3) Run the bot with `node index.js` and keep it open. The bot will react with a "👍" to any message that starts with a TikTok link and save it.
   
    ![Discord Reaction](/docs/discordMsg.JPG)

5) `//check` will get the bot to text to that text channel with who sent how many TikToks and `//checkpoint` will also attatch a JSON file and clear the bot memory.
    ```
    ======================================
    User1 has sent 38 TikToks
    User2 has sent 25 TikToks
    User3 has sent 51 TikToks
    Total of 114 TikToks
    ======================================
    ```

### Browser Extension
1) Go through [Google documentation](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) for installing custom extensions.
2) Download the JSON from the Discord bots message. In the extension menu open this extension and find the JSON you downloaded to innitiate.

 ![Discord Reaction](/docs/preInit.JPG)

3) The bot will open TikTok and you will find a small panel on the left to go through all the TikToks that were sent.

 ![Discord Reaction](/docs/panel.JPG)
 
4)  Stream your browser on Discord or whatever streaming platform you'd like!

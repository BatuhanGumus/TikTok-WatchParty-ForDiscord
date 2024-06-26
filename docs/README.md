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
    - Click the __/__ number to get sent to the discord message of the TikTok you are watching

> [!NOTE]  
> I have only used this extension on Google Chrome so I cannot guarantee compatibility with all browsers 


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

    <img src="/docs/discordMsg.JPG" width="370">

4) `//check` will get the bot to text to that text channel with who sent how many TikToks and `//checkpoint` will also attatch a JSON file and clear the bot memory.
    ```
    ======================================
    User1 has sent 38 TikToks
    User2 has sent 25 TikToks
    User3 has sent 51 TikToks
    Total of 114 TikToks
    ======================================
    ```

    ```json
    {
      {
      "sentBy": "user#0",
      "comment": "LMAO",
      "sentAt": "2023-08-26T21:05:18.285Z",
      "link": "https://vm.tiktok.com/link/",
      "messageLink": "https://discord.com/channels/message/reference/link"
      },
     .....
    }
    ```

### Browser Extension
1) Go through [Google documentation](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) for installing custom extensions.
2) Download the JSON from the Discord bots message. In the extension menu open this extension and find the JSON you downloaded to innitiate.

    <img src="/docs/preInit.JPG" width="370">

3) The bot will open TikTok and you will find a small panel on the left to go through all the TikToks that were sent.

    <img src="/docs/panel.JPG" height="300">
 
4)  Stream your browser on Discord or whatever streaming platform you'd like!

## Additional Uses
Because you now have all these JSON's you can do some data science with it to bully a friend for sending too many TikToks at 3 am with graphs, or see group behaviour over the years!

Users TikTok Count per Hour            |  Groups TikTok Count per Month
:-------------------------:|:-------------------------:
![](https://github.com/BatuhanGumus/TikTok-WatchParty-ForDiscord/assets/45213285/ceb6a072-7a0c-43af-99d9-2213ad27b4ac)  |  ![](https://github.com/BatuhanGumus/TikTok-WatchParty-ForDiscord/assets/45213285/05ecb4ae-f1e7-41b7-b146-fc92a5c392f3)

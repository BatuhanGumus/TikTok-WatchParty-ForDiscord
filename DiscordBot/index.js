var fs = require('fs');

const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

var sentToks = []
var sendCount = {};

const linkStarters = [
    "https://vm.tiktok.com/",
    "https://m.tiktok.com/",
    "https://vt.tiktok.com/",
    "https://www.tiktok.com/",
]


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => 
{
    if (CheckValidLink(msg.content))
    {
        if(msg.author.tag in sendCount === false)
        {
            sendCount[msg.author.tag] = 0;
        }
        sendCount[msg.author.tag] += 1;

        var tok = GetTokFromMsg(msg);
        sentToks.push(tok);

        msg.react('👍').catch(error => console.error('emoji failed', error));
    }
    else if(msg.content === "//checkpoint")
    {
       SendDataAndJsonMessage(msg);
    }
    else if(msg.content === "//check")
    {
        SendDataMessage(msg);
    }
});

function SendDataMessage(msg)
{
    var out = "======================================\n";

            var total = 0;

        for (const member in sendCount) 
        {
            out += `${member} has sent ${sendCount[member]} TikToks\n`;
            total += sendCount[member];
        }

        out += `Total of ${total} TikToks\n`
        out += "======================================\n";

        msg.channel.send(out);
}

function SendDataAndJsonMessage(msg)
{
    fs.writeFile('SentToks.json', JSON.stringify(sentToks), function (err) {
        if(err) throw err;
        
        const attachent = new Discord.MessageAttachment('./SentToks.json');

        var out = "======================================\n";

        var total = 0;

        for (const member in sendCount)
        {
            out += `${member} has sent ${sendCount[member]} TikToks\n`;
            total += sendCount[member];
        }

        out += `Total of ${total} TikToks\n`
        out += "======================================\n";

        msg.channel.send(out, attachent);

        sentToks = []
        sendCount = {};
    })
}


function CheckValidLink(content)
{
    for (const i in linkStarters)
    {
        if(content.startsWith(linkStarters[i])){
            return true;
        } 
    }
    return false;
}

function GetTokFromMsg(msg)
{
    var indexOfSpace = msg.content.indexOf(' ');
    if(indexOfSpace === -1) indexOfSpace = msg.content.indexOf('\n');

    var link = "";
    var comment = "";

    if(indexOfSpace === -1)
    {
        link = msg.content;
    }
    else
    {
        link = msg.content.substr(0, indexOfSpace - 1);
        comment = msg.content.substr(indexOfSpace + 1);
    }

    var sentBy = msg.author.tag;
    var date = msg.createdAt;

    //TODO: use original name
    
    var tok = {
        'sentBy' : sentBy,
        'comment' : comment,
        'sentAt' : date,
        'link' : link,
        'messageLink' : msg.url,
    }

    return tok;
}

client.login(config.token);
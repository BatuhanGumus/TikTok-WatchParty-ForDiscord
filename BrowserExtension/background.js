//TODO: show discord message wont work with random

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        onTok: 0,
        toks: [],
        randomisedToks: [],
        hideToggleValue: false,
        randomToggleValue: false
    });
});

function seededRandom(seed)
{
    return ((Math.sin(seed) * 13758.5453123) % 1 + 1) / 2;
}

function shuffle(array, seed) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(seededRandom(seed + currentIndex * 0.25346) * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if(request.message === "init")
    {
        var data = request.payload

        var numarr = [];
        for (let i = 0; i < data.length; i++) {
            numarr[i] = i;
        }
        var date =  data[0].sentAt;
        var seed = parseInt(date.replace(/\D/g,'')) / 100000000000.527;
        shuffle(numarr, seed)

        chrome.storage.local.set({
            onTok: 0,
            toks: data,
            randomisedToks: numarr
        }, ()=>{
            chrome.storage.local.get(['onTok', 'toks', 'randomToggleValue', 'randomisedToks'], info =>{
                var nerUrl = "";
                if(info.randomToggleValue == false) newUrl = info.toks[info.onTok].link;
                else newUrl = info.toks[info.randomisedToks[info.onTok]].link;
                chrome.tabs.create({ url: newUrl });
            })
        });
    }
    else if(request.message === "moveOnToks")
    {
        chrome.storage.local.get(['onTok', 'toks', 'randomToggleValue', 'randomisedToks'], info =>{
            var newTokId = info.onTok + request.payload;
            if(newTokId => 0 && newTokId < info.toks.length)
            {
                var nerUrl = "";
                if(info.randomToggleValue == false) newUrl = info.toks[newTokId].link;
                else newUrl = info.toks[info.randomisedToks[newTokId]].link;

                chrome.tabs.update({ url: newUrl });
    
                chrome.storage.local.set({
                    onTok: newTokId,
                });
            }
        });
    }
    else if(request.message === "attemptRestore")
    {
        chrome.storage.local.get(['onTok', 'toks'], info =>{
            var newUrl = info.toks[info.onTok].link;
            chrome.tabs.create({ url: newUrl });
        });
    }
    else if(request.message === "ppenMessageLink")
    {
        chrome.storage.local.get(['onTok', 'toks'], info =>{
            var newUrl = info.toks[info.onTok].messageLink;
            chrome.tabs.create({ url: newUrl });
        });
    }
    else if(request.message === "setOnTok")
    {
        chrome.storage.local.get(['onTok', 'toks', 'randomToggleValue', 'randomisedToks'], info =>{
            var newTokId = request.payload;
            if(newTokId => 0 && newTokId < toks.length)
            {
                var nerUrl = "";
                if(info.randomToggleValue == false) newUrl = info.toks[newTokId].link;
                else newUrl = info.toks[info.randomisedToks[newTokId]].link;
                chrome.tabs.update({ url: newUrl });
    
                chrome.storage.local.set({
                    onTok: newTokId
                });
            }
        });
    }
    else if(request.message === "hideToggle")
    {
        chrome.storage.local.get(['hideToggleValue'], info => {
            chrome.storage.local.set({
                hideToggleValue: !info.hideToggleValue
            })
        })
    }
    else if(request.message === "randomToggle")
    {
        chrome.storage.local.get(['randomToggleValue'], info => {
            chrome.storage.local.set({
                randomToggleValue: !info.randomToggleValue
            })
        })
    }
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    if(changeInfo.status === "complete" && /^http/.test(tab.url))
    {
        chrome.scripting.insertCSS({
            target: {tabId: tabId},
            files: ["./foreground_styles.css"]
        }).then(()=>{
            chrome.scripting.executeScript({
                target: {tabId: tabId},
                files: ["./foreground.js"]
            }).then(()=>{
                console.log("Injected foreground");
            })
        }).catch(err=>console.log(err));
    }
});
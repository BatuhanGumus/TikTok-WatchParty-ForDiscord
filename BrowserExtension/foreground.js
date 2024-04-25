const main_container = document.createElement('DIV');
main_container.classList.add('main_container');


const sent_by_text = document.createElement('DIV');
sent_by_text.classList.add('info_text');
sent_by_text.innerHTML = 'by: ___';

const hide_sent_by = document.createElement('DIV');
hide_sent_by.classList.add('reveal');
hide_sent_by.addEventListener('click', ()=>{
    sent_by_text.id = '';
    comment_text.id = '';
    hide_sent_by.id = 'hide';
})

const comment_text = document.createElement('DIV');
comment_text.classList.add('info_text');
comment_text.innerHTML = '\"\"';

const up_button = document.createElement('DIV');
up_button.classList.add('direction_button');
up_button.innerHTML = '/\\';
up_button.addEventListener('click', ()=>{
    chrome.runtime.sendMessage({
        message: "moveOnToks",
        payload: -1
    });
})

const down_button = document.createElement('DIV');
down_button.classList.add('direction_button');
down_button.innerHTML = '\\/';
down_button.addEventListener('click', ()=>{
    chrome.runtime.sendMessage({
        message: "moveOnToks",
        payload: +1
    });
})

const count_line = document.createElement('DIV');
count_line.classList.add('horizontal');
count_line.classList.add('horizontal_spaceout');

const onTok_text = document.createElement('DIV');
onTok_text.classList.add('info_text');
onTok_text.classList.add('number_showcase');
onTok_text.innerHTML = "_/_"
onTok_text.addEventListener('click', ()=>{
    chrome.runtime.sendMessage({
        message: "ppenMessageLink"
    });
})

const tpId_container = document.createElement('DIV');
tpId_container.classList.add('horizontal');

const tpId_input = document.createElement('INPUT');
tpId_input.id = 'tpId_input';
tpId_input.type = 'number';
tpId_input.value = 1;

const tpId_button = document.createElement('DIV');
tpId_button.id = 'tpId_button';
tpId_button.innerHTML = 'TP';
tpId_button.addEventListener('click', ()=>{
    chrome.runtime.sendMessage({
        message: "setOnTok",
        payload: tpId_input.value - 1
    });
})

tpId_container.appendChild(tpId_input);
tpId_container.appendChild(tpId_button);

count_line.appendChild(onTok_text);
count_line.appendChild(tpId_container);

const settings_line = document.createElement('DIV');
settings_line.classList.add('horizontal');
settings_line.classList.add('horizontal_spaceout');

const hide_toggle_container = document.createElement('DIV');
hide_toggle_container.classList.add('horizontal');

const hide_info = document.createElement('DIV');
hide_info.classList.add('options_info');
hide_info.innerHTML = 'hide';

const hide_toggle = document.createElement('DIV');
hide_toggle.classList.add('options_toggle');
hide_toggle.innerHTML = '☑';
hide_toggle.addEventListener('click', ()=>{
    chrome.runtime.sendMessage({
        message: "hideToggle",
    });
    if(hide_toggle.innerHTML == '☑') hide_toggle.innerHTML = '☐';
    else hide_toggle.innerHTML = '☑';
})

hide_toggle_container.appendChild(hide_info);
hide_toggle_container.appendChild(hide_toggle);

const random_toggle_container = document.createElement('DIV');
random_toggle_container.classList.add('horizontal');

const ranadom_info = document.createElement('DIV');
ranadom_info.classList.add('options_info');
ranadom_info.innerHTML = 'random';

const random_toggle = document.createElement('DIV');
random_toggle.classList.add('options_toggle');
random_toggle.innerHTML = '☑';
random_toggle.addEventListener('click', ()=>{
    chrome.runtime.sendMessage({
        message: "randomToggle",
    });
    if(random_toggle.innerHTML == '☑') random_toggle.innerHTML = '☐';
    else random_toggle.innerHTML = '☑';
})

random_toggle_container.appendChild(ranadom_info);
random_toggle_container.appendChild(random_toggle);

settings_line.appendChild(hide_toggle_container);
settings_line.appendChild(random_toggle_container);


function updateInfo()
{
    chrome.storage.local.get(['onTok', 'toks', 'hideToggleValue', 'randomToggleValue', 'randomisedToks'], info =>{
        var tok = info.toks[info.onTok];
        if(info.randomToggleValue == true) tok = info.toks[info.randomisedToks[info.onTok]];

        sent_by_text.innerHTML = `by: ${tok.sentBy.split('#')[0]}`;
        if(info.hideToggleValue == true){
            sent_by_text.id = 'hide';
            comment_text.id = 'hide';
            hide_sent_by.id = '';
        } 
        else{
            sent_by_text.id = '';
            comment_text.id = '';
            hide_sent_by.id = 'hide';
        }

        if(tok.comment != "") comment_text.innerHTML = `${tok.comment}`;
        else comment_text.innerHTML = "";

        onTok_text.innerHTML = `${info.onTok + 1}/${info.toks.length}`
        tpId_input.value = info.onTok + 1;

        if(info.hideToggleValue == true)
            hide_toggle.innerHTML = '☑';
        else
            hide_toggle.innerHTML = '☐';

        if(info.randomToggleValue == true)
            random_toggle.innerHTML = '☑';
        else
            random_toggle.innerHTML = '☐';
    });

}

updateInfo();

main_container.appendChild(up_button);
main_container.appendChild(sent_by_text);
main_container.appendChild(hide_sent_by);
main_container.appendChild(comment_text);
main_container.appendChild(down_button);
main_container.appendChild(count_line);
main_container.appendChild(settings_line);

document.querySelector('body').appendChild(main_container);
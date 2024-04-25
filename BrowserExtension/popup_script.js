
const fileInput = document.createElement('INPUT');
fileInput.type = "file";
fileInput.multiple = false;
fileInput.accept = ".json";
fileInput.required = true;


const initButton = document.createElement('BUTTON');
initButton.innerHTML = 'Init viewing';
initButton.addEventListener('click', ()=>
{
    if(fileInput.value !== "")
    {
        var reader = new FileReader();

        reader.addEventListener('load', function() {
            var result = JSON.parse(reader.result); // Parse the result into an object 
            
            chrome.runtime.sendMessage({
                message: "init",
                payload: result
            });
        });

        reader.readAsText(fileInput.files[0]);
    }
})

const restorePrevView = document.createElement('BUTTON');
restorePrevView.innerHTML = 'Restore Previous Viewing';
restorePrevView.addEventListener('click', ()=>
{
    chrome.runtime.sendMessage({
        message: "attemptRestore",
    });
})

document.querySelector('body').appendChild(fileInput);
document.querySelector('body').appendChild(initButton);
document.querySelector('body').appendChild(restorePrevView);
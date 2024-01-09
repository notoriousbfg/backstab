function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        blockedUrls: document.querySelector("#urls").value,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#urls").value = result.blockedUrls || 'youtube.com';
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("blockedUrls");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);

document.querySelector("form").addEventListener("submit", saveOptions);

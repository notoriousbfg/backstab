function onBefore (details) {
    if (details.frameId > 0) {
        return
    }

    browser.tabs.update({
        url: "pages/tab.html"
    });

    console.log('tab updated');
}

function sanitiseURL(url) {
    if (!url.match(/^(?:\w+:)?\/\/(\S+)$/)) {
        url = 'http://' + url;
    }
    url = url.replace(/\s/g, '');
    return url;
}

browser.storage.sync.get("blockedUrls")
    .then(function (result) {
        var blockedUrlString = result.blockedUrls

        console.log(`blocked urls: ${blockedUrlString}`)

        var blockedUrls = new Set([]);
        if (blockedUrlString.indexOf(',') > -1) {
            blockedUrlString.split(',').forEach(function (item) {
                var sanitised = sanitiseURL(item)
                var url = new URL(sanitised)
                blockedUrls.add(url.hostname)
            });
        } else {
            var sanitised = sanitiseURL(blockedUrlString)
            var url = new URL(sanitised)
            blockedUrls.add(url.hostname)
        }

        var filters = [];
        blockedUrls.forEach(function (item, index) {
            filters.push({ hostContains: item });
        })

        const filter = {
            url: filters,
        };

        browser.webNavigation.onBeforeNavigate.addListener(
            onBefore,
            filter
        );

    }, function (error) {
        console.log(`Error: ${error}`);
    });
function onBefore(details, blockedUrls) {
    if (details.frameId > 0) {
        return
    }

    console.log({
        url: details.url,
        host: hostName(details.url)
    })

    if (blockedUrls.indexOf(hostName(details.url)) > -1) {
        browser.tabs.update({
            url: "pages/tab.html"
        });

        console.log('tab updated');
    }
}

function hostName(url) {
    if (!url.match(/^(?:\w+:)?\/\/(\S+)$/)) {
        url = 'http://' + url;
    }

    url = url.replace(/\s/g, '')

    console.log(`url: ${url}`)

    var hostname = (new URL(url))
        .hostname
        .replace(/^www\./, '');
        
    return hostname
}

browser.storage.sync.get("blockedUrls")
    .then(function (result) {
        var blockedUrlString = result.blockedUrls

        console.log(`blocked urls: ${blockedUrlString}`)

        var blockedUrls = new Set([]);
        if (blockedUrlString.indexOf(',') > -1) {
            blockedUrlString.split(',').forEach(function (item) {
                blockedUrls.add(hostName(item))
            });
        } else {
            blockedUrls.add(hostName(blockedUrlString))
        }

        // var filters = [];
        // blockedUrls.forEach(function (item, index) {
        //     filters.push({ hostContains: item });
        // })

        // console.log(filters)

        // const filter = {
        //     url: filters,
        // };

        browser.webNavigation.onBeforeNavigate.addListener(function (details) {
            onBefore(details, [...blockedUrls])
        });

    }, function (error) {
        console.log(`Error: ${error}`);
    });
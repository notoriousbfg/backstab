function currentTime () {
    var now = new Date();
    var minutes = now.getMinutes();
    var time = now.getHours() + ":" + ((minutes < 10 ? '0' : '') + minutes);
    document.getElementById("time").innerText = time;
}

function greeting() {
    var now = new Date();
    var hours = now.getHours();
    var greeting = "Hello";
    if (hours > 18) {
        greeting = "Good evening";
    } else if (hours >= 12) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good morning";
    }
    document.getElementById("title").innerText = greeting;
    document.getElementById("greeting").innerText = greeting;
}

currentTime();
greeting();

setInterval(function () {
    currentTime();
    greeting();
}, 1000)
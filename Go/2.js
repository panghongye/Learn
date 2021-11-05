function sleep(n) {
    var start = new Date().getTime()
    while (time - start <= n) {
        var time = new Date().getTime()
        if (time - start > n) { break }
    }
}

function getUserId() {
    for (let i = 0; i < 200; i++) {
        if (shellOAcode) {
            return console.log("shellOAcode ok")
        }
        if (i == 100) {
            console.log("shellOAcode 100")
        }
        sleep(1000)  // 50ms
    }
}

var shellOAcode

getUserId()
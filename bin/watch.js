const fs = require('fs');
const crypto = require("crypto")
const { exec } = require("child_process");

const directoryToWatch = './src';

let buildingSvelte = false
let buildingCSS = false

const watcher = fs.watch(directoryToWatch, (eventType, filename) => {
    if (!buildingSvelte && filename.endsWith(".svelte")) {
        console.log(`starting building ${filename}`)
        let s = Date.now()
        buildingSvelte = true
        exec("node " + __dirname + "/build-svelte.js", err => {
            if (err) throw err
            console.log("build svelte done " + (Date.now() - s) + "ms")
            buildingSvelte = false
        })
    }

});

let lastHex = ""
const cssWatcher = fs.watch(__dirname + "/dist/index.css", (eventType, filename) => {
    if (!buildingCSS && filename.endsWith(".css")) {
        let file = fs.readFileSync(__dirname + "/dist/index.css")
        let hash = crypto.createHash("sha256")
        hash.update(file)
        let hex = hash.digest("hex")
        if(hex !== lastHex){
            console.log(`starting building ${filename}`)
            lastHex = hex
            let s = Date.now()
            buildingCSS = true
            exec("node " + __dirname + "/build-css.js", err => {
                if (err) throw err
                console.log("build css done " + (Date.now() - s) + "ms")
                buildingCSS = false
            })
        }else{
            console.log(`no changes on ${filename} ${eventType}`)
        }
    }
})

watcher.on('error', error => {
    console.error(`Watcher error: ${error}`);
});

cssWatcher.on('error', error => {
    console.error(`Watcher error: ${error}`);
});
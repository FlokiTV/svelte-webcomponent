const fs = require('fs');
const { exec } = require("child_process");

const directoryToWatch = './src';

let buildingSvelte = false
let buildingCSS = false

const watcher = fs.watch(directoryToWatch, (eventType, filename) => {
    if (!buildingSvelte && filename.endsWith(".svelte")) {
        console.log(`starting building ${filename}`)
        let s = Date.now()
        buildingSvelte = true
        exec("node " + __dirname + "/buildscript.js", err => {
            if (err) throw err
            console.log("build svelte done " + (Date.now() - s) + "ms")
            buildingSvelte = false
        })
    }
    if (!buildingCSS && filename.endsWith(".css")) {
        console.log(`starting building ${filename}`)
        let s = Date.now()
        buildingCSS = true
        exec("node " + __dirname + "/build-css.js", err => {
            if (err) throw err
            console.log("build css done " + (Date.now() - s) + "ms")
            buildingCSS = false
        })
    }
});

watcher.on('error', error => {
    console.error(`Watcher error: ${error}`);
});
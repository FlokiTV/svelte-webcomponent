const fs = require("fs");
const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");
const { exec } = require("child_process");

const _DIST = __dirname + "/dist/"
//make sure the directoy exists before stuff gets put into it
// if (fs.existsSync(_DIST)) fs.rmdirSync(_DIST, { recursive: true, force: true })
if (!fs.existsSync(_DIST)) {
    fs.mkdirSync(_DIST);
}
const DIST = "./dist/"
//make sure the directoy exists before stuff gets put into it
// if (fs.existsSync(DIST)) fs.rmdirSync(DIST, { recursive: true, force: true })
if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST);
}

//build the application
esbuild
    .build({
        entryPoints: [__dirname + "/index.js"],
        mainFields: ["svelte", "browser", "module", "main"],
        conditions: ["svelte", "browser"],
        outdir: _DIST,
        format: "esm",
        logLevel: "info",
        minify: true, //so the resulting code is easier to understand
        bundle: true,
        splitting: true,
        sourcemap: "inline",
        plugins: [sveltePlugin()],
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(() => {
        //use a basic html file to test with
        fs.copyFile(_DIST+"../index.html", "./dist/index.html", (err) => {
            if (err) throw err;
        });
        fs.copyFile(_DIST+"index.js", "./dist/index.js", (err) => {
            if (err) throw err;
        });
    })
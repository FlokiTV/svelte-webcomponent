const fs = require("fs");
const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");
const { exec } = require("child_process");

const _DIST = __dirname + "/dist/";
// if (fs.existsSync(_DIST)) fs.rmdirSync(_DIST, { recursive: true, force: true })

//make sure the directoy exists before stuff gets put into it
if (!fs.existsSync(_DIST)) {
  fs.mkdirSync(_DIST);
}
const DIST = "./dist/";
//make sure the directoy exists before stuff gets put into it
// if (fs.existsSync(DIST)) fs.rmdirSync(DIST, { recursive: true, force: true })
if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST);
}
let isCopy = false;

const watcher = fs.watch(_DIST, (eventType, filename) => {
  if (!isCopy) {
    isCopy = true;
    console.log("copy index.js");
    fs.copyFile(_DIST + "index.js", "./dist/index.js", (err) => {
      // if (err) throw err;
      isCopy = false;
      console.log("copy index.js done");
    });
  } else {
    console.log("index.js busy");
  }
  fs.copyFile(_DIST + "../index.html", "./dist/index.html", (err) => {
    // if (err) throw err;
  });
  fs.copyFile("./config.js", "./dist/config.js", (err) => {
    // if (err) throw err;
  });
});

//build the application
// https://esbuild.github.io/api/#watch
const watch = () => {
  esbuild
    .context({
      entryPoints: [__dirname + "/index.js"],
      mainFields: ["svelte", "browser", "module", "main"],
      conditions: ["svelte", "browser"],
      outdir: process.cwd()+"/dist/",
      format: "esm",
      logLevel: "info",
      minify: true, //so the resulting code is easier to understand
      bundle: true,
      splitting: true,
      sourcemap: "inline",
      plugins: [sveltePlugin()],
    })
    .then(async (ctx) => {
      try {
        await ctx.watch();
      } catch (error) {
        console.log("Restarting in 3s...");
        setTimeout(() => {
          watch();
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("Restarting in 3s...");
      setTimeout(() => {
        watch();
      }, 3000);
      // process.exit(1);
    });
};

watch();

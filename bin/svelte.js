const fs = require("fs");
const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");
const { exec } = require("child_process");

const DIST = process.cwd() + "/dist";
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST);
  fs.copyFileSync(__dirname + "/index.html", DIST + "/index.html");
}

const copyJsConfig = () => {
  console.log("[init] copy config.js file");
  fs.copyFileSync(DIST + "/../config.js", DIST + "/config.js");
};
fs.watchFile(DIST + "/../config.js", copyJsConfig);
copyJsConfig();
//build the application
// https://esbuild.github.io/api/#watch
const watch = () => {
  esbuild
    .context({
      entryPoints: [__dirname + "/index.js"],
      mainFields: ["svelte", "browser", "module", "main"],
      conditions: ["svelte", "browser"],
      outdir: process.cwd() + "/dist/",
      format: "esm",
      logLevel: "info",
      bundle: true,
      splitting: true,
      minify: true,
      sourcemap: false, //"inline",
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

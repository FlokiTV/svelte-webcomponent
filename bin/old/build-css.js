const fs = require("fs");
const { exec } = require("child_process");

exec(`npx tailwindcss -i ${__dirname}/dist/index.css -o ${__dirname}/dist/style.css --minify`, err => {
    if (err) console.log(err)
    console.log("tailwind done")
    fs.copyFile(__dirname + "/dist/style.css", __dirname + "/../dist/style.css", (err) => {
        if (err) throw err;
    });
    // auto append style script
    const css = "`" + fs.readFileSync(__dirname + "/dist/style.css", { encoding: "utf-8" }) + "`"
    const content = `let styleSheet = document.createElement("style");styleSheet.innerText = ${css};document.head.appendChild(styleSheet);`
    fs.writeFile(__dirname + '/dist/style.js', content, (err) => {
        if (err) {
            console.error('Ocorreu um erro ao criar o arquivo:', err);
            return;
        }
        fs.copyFile(__dirname + "/dist/style.js", __dirname + "/../dist/style.js", (err) => {
            if (err) throw err;
        });
        console.log('style.js done');
    });
})
const fs = require("fs");

try {
    fs.rmSync('./dist/style.js')
} catch (error) {

}

let style = fs.readFileSync("./dist/style.css", { encoding: "utf-8" })
var textEncoder = new TextEncoder();
var encodedString = textEncoder.encode(style);
const css = "`" + style + "`"
const content = `
let styleSheet = document.createElement("style");
let textDecoder = new TextDecoder();
let enc = new Uint8Array([${encodedString.toString()}]);
styleSheet.innerText = textDecoder.decode(enc);
document.head.appendChild(styleSheet);`
fs.writeFile('./dist/style.js', content, (err) => {
    if (err) {
        console.error('Ocorreu um erro ao criar o arquivo:', err);
        return;
    }
    console.log('style.js done');
});
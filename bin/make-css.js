const fs = require("fs");

try {
  fs.rmSync(process.cwd() + "/dist/style.js");
} catch (error) {}

let style = fs.readFileSync(process.cwd() + "/dist/style.css", {
  encoding: "utf-8",
});

let textEncoder = new TextEncoder();
let encodedString = textEncoder.encode(style);
const css = "`" + style + "`";

const content = `
let styleSheet = document.createElement("style");
let textDecoder = new TextDecoder();
let enc = new Uint8Array([${encodedString.toString()}]);
styleSheet.innerText = textDecoder.decode(enc);
document.head.appendChild(styleSheet);`;

fs.writeFile(process.cwd() + "/dist/style.js", content, (err) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("style.js done");
});

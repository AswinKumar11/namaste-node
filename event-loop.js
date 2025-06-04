const fs = require("node:fs");
const crypto = require("node:crypto");

setImmediate(() => {
    console.log("immediate");
});
fs.readFile("./package.json", "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
setTimeout(() => {
    console.log("hello world");
},0);

process.nextTick(() => {
    console.log("next tick");
});

// crypto.pbkdf2Sync("password", "salt", 10000000, 5, "sha512");

crypto.pbkdf2("password", "salt", 100, 5, "sha512", (err, derivedKey) => {
    if (err) throw err;
    console.log(derivedKey.toString('hex'));
  });
  
// console.log(a);

console.log("test");
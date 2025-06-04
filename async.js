const fs = require("node:fs");

fs.readFile("./package.json", "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

console.log("test");
const main = require("./dbOperations");

// main("userDetails", "user", "insert", [
//   { name: "siva", age: 25, email: "siva@gmail.com" },
// ]);

async function run() {
  const a = await main("userDetails", "user", "read", {});
  console.log("Returned data:", a);
}
run();
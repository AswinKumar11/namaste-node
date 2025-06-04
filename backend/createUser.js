const main = require("./dbOperations");

main("userDetails", "user", "insert", [
  { name: "siva", age: 25, email: "siva@gmail.com" },
]);
// (1) Import your tests.
import { getTimeStringTest } from "./getTimeString.test.js";
import { runAllTests } from "./lib/tester.js";

// (2) Run your tests.
console.info("Starting tests...");

runAllTests(getTimeStringTest)
  .then(() => {
    console.info("All tests passed!");
    process.exit(0);
  })
  .catch((error: Error) => {
    console.error(error.toString());
    process.exit(1);
  });

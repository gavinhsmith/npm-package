// (1) Import your tests.
import { getTimeStringTest } from "./getTimeString.test.js";

// (2) Run your tests.
console.info("Starting tests...");

// Promise.all([getTimeStringTest.run(), ...]) <-- Use this to run all tests.
getTimeStringTest
  .run()
  .then(() => {
    console.info("All tests passed!");
    process.exit(0);
  })
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });

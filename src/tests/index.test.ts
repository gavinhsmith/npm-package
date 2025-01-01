/**
 * Template for a basic module test.
 *
 * @description This is a basic collection of tests.
 *
 * @author gavinhsmith
 * @version 1.0.0
 */

// (1) Import your tests.
import getTimeStringTest from "./getTimeString.test.js";

// (2) Run your tests.
console.info("Starting tests...");

Promise.all([getTimeStringTest.run()])
  .then(() => {
    console.info("All tests passed!");
    process.exit(0);
  })
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });

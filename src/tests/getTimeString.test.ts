// (1) OPTIONAL: These are for my test implementation, not required for you :P.
// (2) Import your module for the test.
import { dateAtInit, getTimeString } from "../module";
import { Test } from "./tester.js";

// (3) Design your test. This should be standardized. I like to use promises.

/** Test getTimeString(). */
export const getTimeStringTest = Test("getTimeString", [
  "testResult",
  (pass, fail) => {
    const timeNow = new Date();

    const expected = `The time right now is ${timeNow.toString()}, which is ${String(
      timeNow.getTime() - dateAtInit.getTime(),
    )} milliseconds after the module was loaded ${dateAtInit.toString()}`;
    const actual = getTimeString({
      dateNow: timeNow,
      timeSenseStart: timeNow.getTime() - dateAtInit.getTime(),
    });

    if (actual === expected) {
      pass();
    } else {
      fail("Strings not equal");
    }
  },
]);

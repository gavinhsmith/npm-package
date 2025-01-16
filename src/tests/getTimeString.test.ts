// (1) OPTIONAL: These are for my test implementation, not required for you :P.

// (2) Import your module and tools for the test.
import { dateAtInit, getTimeString } from "../module";
import { Test } from "./lib/tester.js";

// (2b) Make helper functions if you need.

const generateExpectedString = (timeNow: Date) => {
  return `The time right now is ${timeNow.toString()}, which is ${String(
    timeNow.getTime() - dateAtInit.getTime(),
  )} milliseconds after the module was loaded ${dateAtInit.toString()}`;
};

// (3) Design your test. This should be standardized. I like to use promises like my test module.

/** Tester for getTimeString(). */
export const getTimeStringTest = Test(
  "getTimeString",
  [
    "testStringEquals",
    (pass, fail) => {
      const timeNow = new Date();

      const expected = generateExpectedString(timeNow);
      const actual = getTimeString({
        dateNow: timeNow,
        timeSenseStart: timeNow.getTime() - dateAtInit.getTime(),
      });

      if (expected === actual) {
        pass();
      } else {
        fail(
          `Strings were not equal. Expected "${expected}" but got "${actual}".`,
        );
      }
    },
  ],
  [
    "testStringNotEquals",
    (pass, fail) => {
      const timeNow = new Date();

      const actual = getTimeString();

      setTimeout(() => {
        const expected = generateExpectedString(timeNow);

        fail(`Strings were equal. Expected "${expected}" but got "${actual}".`);

        if (expected === actual) {
          fail(
            `Strings were equal. Expected "${expected}" but got "${actual}".`,
          );
        } else {
          pass();
        }
      }, 1000);
    },
  ],
);

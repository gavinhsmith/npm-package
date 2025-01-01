// (1) OPTIONAL: These are for my test implementation, not required for you :P.
import Test from "./tester.js";

// (2) Import your module for the test.
import getTimeString, { DATE_AT_INIT } from "@this";

// (3) Design your test. This should be standardized. I like to use promises.

/** test */
export const getTimeStringTest = new Test("getTimeString", [
  "testResult",
  (pass, fail) => {
    const timeNow = new Date();

    const expected = `The time right now is ${timeNow.toString()}, which is ${
      timeNow.getTime() - DATE_AT_INIT.getTime()
    } milliseconds after the module was loaded ${DATE_AT_INIT.toString()}`;
    const actual = getTimeString([
      timeNow,
      timeNow.getTime() - DATE_AT_INIT.getTime(),
    ]);

    if (actual != expected) fail("Strings not equal");

    pass();
  },
]);
export default getTimeStringTest;

// This is not needed for you, implement your tests in the way you want.

/** A subtest function. */
type Subtest = [
  string,
  (pass: () => void, fail: (reason: string) => void) => void,
];

/** An error that is thrown when a subtest fails. */
class SubtestFailedError extends Error {
  constructor(subtestName: string, reason: string) {
    super(`${subtestName} failed: ${reason}`);
    Error.captureStackTrace(this, this.constructor);
  }
}

/** An error that is thrown when a test fails. */
class TestFailedError extends Error {
  constructor(testName: string, cause: SubtestFailedError) {
    super(`${testName} failed!`, { cause });
    Error.captureStackTrace(this, this.constructor);
  }
}

type Test = {
  run: () => Promise<void>;
};

type TestConstructor = (name: string, ...subtests: Subtest[]) => Test;

export const Test: TestConstructor = (name, ...subtests) => {
  return {
    run: () => {
      return new Promise((pass, fail) => {
        const promises: Promise<void>[] = [];

        for (const subtest of subtests) {
          promises.push(
            new Promise((subtestPass, subtestFail) => {
              new Promise<void>(subtest[1])
                .then(subtestPass)
                .catch((error: string) => {
                  subtestFail(new SubtestFailedError(subtest[0], error));
                });
            }),
          );
        }

        Promise.all(promises)
          .then(() => {
            pass();
          })
          .catch((error: SubtestFailedError) => {
            fail(new TestFailedError(name, error));
          });
      });
    },
  };
};

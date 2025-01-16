// This is not needed for you, implement your tests in the way you want.

/** A subtest function. */
export type Subtest = [
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
  name: string;
  cause: SubtestFailedError[] = [];
  success: string[] = [];

  constructor(
    testName: string,
    failures: SubtestFailedError[],
    success: string[],
  ) {
    super(`${testName} failed!`);
    this.name = testName;
    this.cause = failures;
    this.success = success;
    Error.captureStackTrace(this, this.constructor);
  }

  toString(): string {
    let outString = this.message;

    for (const failure of this.cause) {
      outString = `${outString}\n   ╠ X ${failure.message}`;
    }

    for (const success of this.success) {
      outString = `${outString}\n   ╠ - ${success} passed.`;
    }

    return outString;
  }
}

/** An error that is thrown when a list of tests fail. */
class TestsFailedError extends Error {
  cause: TestFailedError[] = [];
  success: string[] = [];

  constructor(none: null, failures: TestFailedError[], success: string[]) {
    super("One or more tests failed!");
    this.cause = failures;
    this.success = success;
    Error.captureStackTrace(this, this.constructor);
  }

  toString(): string {
    let outString = this.message;

    for (const failure of this.cause) {
      outString = `${outString}\n ╠ X ${failure.toString()}`;
    }

    for (const success of this.success) {
      outString = `${outString}\n ╠ - ${success} passed.`;
    }

    return outString;
  }
}

type Constructor<T, K, J, I> = new (arg1: K, arg2: J[], arg3: I[]) => T;

/**
 * Checks if a set of tests or subtests has all completed.
 *
 * @param error - The error constructor and paramaters to pass.
 * @param pass - The parent promises resolve function.
 * @param fail - THe parent promises reject function.
 */
const processTestResults = <
  ErrorType extends TestFailedError | TestsFailedError,
  ErrorParam1Type,
  ErrorParam2Type,
  ErrorParam3Type,
>(
  error: {
    ctor: Constructor<
      ErrorType,
      ErrorParam1Type,
      ErrorParam2Type,
      ErrorParam3Type
    >;
    params: [ErrorParam1Type, ErrorParam2Type[], ErrorParam3Type[]];
  },
  pass: () => void,
  fail: (reason: ErrorType) => void,
): void => {
  if (error.params[1].length > 0) {
    fail(new error.ctor(...error.params));
  } else {
    pass();
  }
};

/** A test to run. */
export type Test = {
  name: string;
  run: () => Promise<void>;
};

type TestConstructor = (name: string, ...subtests: Subtest[]) => Test;

/**
 * Constructs a test.
 *
 * @param name - The name of this test.
 * @param subtests - The subtests to run.
 * @returns A promise that resolves when the test passes.
 */
export const Test: TestConstructor = (name, ...subtests) => {
  return {
    name,
    run: () => {
      return new Promise((pass, fail) => {
        if (subtests.length === 0) {
          pass();
        }

        let remaining = subtests.length;
        const failures: SubtestFailedError[] = [];
        const passes: string[] = [];

        for (const subtest of subtests) {
          new Promise<void>((passSubtest, failSubtest) => {
            try {
              subtest[1](passSubtest, failSubtest);
            } catch (error) {
              failSubtest(new Error(error as string));
            }
          })
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            .then(() => {
              remaining = remaining - 1;

              passes.push(subtest[0]);

              if (remaining === 0) {
                processTestResults<
                  TestFailedError,
                  string,
                  SubtestFailedError,
                  string
                >(
                  {
                    ctor: TestFailedError,
                    params: [subtest[0], failures, passes],
                  },
                  pass,
                  fail,
                );
              }
            })
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            .catch((error: string | Error) => {
              remaining = remaining - 1;

              if (error instanceof Error) {
                failures.push(
                  new SubtestFailedError(subtest[0], error.message),
                );
              } else {
                failures.push(new SubtestFailedError(subtest[0], error));
              }

              if (remaining === 0) {
                processTestResults<
                  TestFailedError,
                  string,
                  SubtestFailedError,
                  string
                >(
                  { ctor: TestFailedError, params: [name, failures, passes] },
                  pass,
                  fail,
                );
              }
            });
        }
      });
    },
  };
};

/**
 * Run all provided tests.
 *
 * @param tests - A list of tests to run.
 * @returns A promise that resolves if they all pass, or rejects if any fail.
 */
export const runAllTests = (...tests: Test[]): Promise<void> => {
  return new Promise((pass, fail) => {
    if (tests.length === 0) {
      pass();
    }

    let remaining = tests.length;
    const failures: TestFailedError[] = [];
    const passes: string[] = [];

    for (const test of tests) {
      test
        .run()
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        .then(() => {
          remaining = remaining - 1;

          passes.push(test.name);

          if (remaining === 0) {
            processTestResults<TestsFailedError, null, TestFailedError, string>(
              { ctor: TestsFailedError, params: [null, failures, passes] },
              pass,
              fail,
            );
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        .catch((error: TestFailedError) => {
          remaining = remaining - 1;

          failures.push(error);

          if (remaining === 0) {
            processTestResults<TestsFailedError, null, TestFailedError, string>(
              { ctor: TestsFailedError, params: [null, failures, passes] },
              pass,
              fail,
            );
          }
        });
    }
  });
};

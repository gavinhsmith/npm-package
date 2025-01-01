// This is not needed for you, implement your tests in the way you want.

/** A subtest function. */
type Subtest = [
  string,
  (pass: () => void, fail: (reason: string) => void) => void
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

/** A test that will be run. */
export default class Test {
  private name: string;
  private subtests: Subtest[];

  constructor(name: string, ...subtests: Subtest[]) {
    this.name = name;
    this.subtests = subtests;
  }

  /**
   * Runs all the subtests.
   * @returns A promise that resolves if passed, or rejects if failed.
   */
  public run(): Promise<void> {
    return new Promise((pass, fail) => {
      const promises: Promise<void>[] = [];

      for (const subtest of this.subtests) {
        promises.push(
          new Promise((pass, fail) => {
            new Promise<void>(subtest[1]).then(pass).catch((reason) => {
              fail(new SubtestFailedError(subtest[0], reason));
            });
          })
        );
      }

      Promise.all(promises)
        .then(() => pass())
        .catch((error: SubtestFailedError) => {
          fail(new TestFailedError(this.name, error));
        });
    });
  }
}

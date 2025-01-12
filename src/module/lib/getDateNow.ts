/** Type of exported function. */
type GetDateNowMethod = (adjust?: number) => Date;

/**
 * Gets the current time, adjusted.
 *
 * @param adjust - Adjusts the time in either direction. In milliseconds.
 * @returns An instance of {@link Date}.
 */
export const getDateNow: GetDateNowMethod = (adjust) => {
  return adjust === undefined || adjust === 0
    ? new Date()
    : new Date(Date.now() + adjust);
};

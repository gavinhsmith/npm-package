/**
 * Gets the current time, adjusted
 * @param adjust Adjusts the time in either direction. In milliseconds.
 * @returns An instance of {@link Date}
 */
export default function getDateNow(adjust: number = 0): Date {
  return adjust != 0 ? new Date(new Date().getTime() + adjust) : new Date();
}

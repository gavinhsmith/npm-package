/**
 * Template for a basic ES module.
 *
 * @description This is a basic ES module.
 *
 * @author gavinhsmith
 * @version 1.0.0
 */

import getDateNow from "./lib/getDateNow.js";

/** The date at the time of module loading. */
export const DATE_AT_INIT = getDateNow();

/**
 * Generates a string that says current time and the time sense boot.
 * @param overrides Override the values used in the string.
 * @returns A fancy string.
 */
export default function getTimeString(
  override?: [Date?, number?, Date?]
): string {
  let timeNow = getDateNow();
  let timeSenseStart = timeNow.getTime() - DATE_AT_INIT.getTime();
  let timeInit = DATE_AT_INIT;

  if (override != null && Array.isArray(override)) {
    timeNow = override[0] ?? timeNow;
    timeSenseStart = override[1] ?? timeSenseStart;
    timeInit = override[2] ?? timeInit;
  }

  return `The time right now is ${timeNow.toString()}, which is ${timeSenseStart} milliseconds after the module was loaded ${timeInit.toString()}`;
}

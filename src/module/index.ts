/**
 * Template for a Basic ES2023 module.
 * @author gavinhsmith
 *
 * Template for a new NPM package powered by TypeScript and ESLint with docs generated using TypeDoc.
 *
 * @module --package-name--
 */

import getDateNow from "./lib/getDateNow.js";

/** The date at the time of module loading. */
export const DATE_AT_INIT = getDateNow();

/**
 * Generates a string that says current time and the time sense boot.
 * @param overrides Override the values used in the string.
 * @returns A fancy string.
 */
export function getTimeString(overrides?: [Date?, number?, Date?]): string {
  let timeNow = getDateNow();
  let timeSenseStart = timeNow.getTime() - DATE_AT_INIT.getTime();
  let timeInit = DATE_AT_INIT;

  if (overrides != null && Array.isArray(overrides)) {
    timeNow = overrides[0] ?? timeNow;
    timeSenseStart = overrides[1] ?? timeSenseStart;
    timeInit = overrides[2] ?? timeInit;
  }

  return `The time right now is ${timeNow.toString()}, which is ${timeSenseStart} milliseconds after the module was loaded ${timeInit.toString()}`;
}

// Export Module
export default getTimeString;

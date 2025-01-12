import { getDateNow } from "./lib/getDateNow.js";

/** Overrides for the method. */
type Overrides = {
  dateNow: Date;
  timeSenseStart: number;
  dateAtInit: Date;
};

/** Type of the method. */
type GetTimeStringMethod = (overrides?: Partial<Overrides>) => string;

/** The date at the time of module loading. */
export const dateAtInit = getDateNow();

/**
 * Generates a string that says current time and the time sense boot.
 *
 * @param overrides - Override the values used in the string.
 * @returns A fancy string.
 */
export const getTimeString: GetTimeStringMethod = (overrides) => {
  let timeNow = getDateNow();
  let timeSenseStart = timeNow.getTime() - dateAtInit.getTime();
  let timeInit = dateAtInit;

  if (overrides !== undefined) {
    timeNow = overrides.dateNow ?? timeNow;
    timeSenseStart = overrides.timeSenseStart ?? timeSenseStart;
    timeInit = overrides.dateAtInit ?? timeInit;
  }

  return `The time right now is ${timeNow.toString()}, which is ${String(timeSenseStart)} milliseconds after the module was loaded ${timeInit.toString()}`;
};

import fetch from './fetch';

export {fetch};

/**
 * Sleep second
 * @param {Number} ms second
 * @example
 * ```js
 * async function sleepyWork() {
 *   console.log("I'm going to sleep for 1 second.");
 *   await sleep(1000);
 *   console.log('I woke up after 1 second.');
 * }
 * ```
 */
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

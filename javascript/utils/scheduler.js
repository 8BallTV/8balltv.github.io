import * as TIME_UTIL from '../utils/time.js';

/*
* Keep track of async tasks by referencing their id and the action
* being performed
*/
export const ASYNC_TASK_IDs = [];

/**
* Schedules the first action and all subsequent actions for actions that
* rely on the 15 minute intervals . An action is  a callback function
* that operates on the fomrattedParseData.
*  e.g. We use this function to schedule the setClipOnVideoPlayer action
*       for the second clip load, and all subsequent clip loads.
*
* @param {Function} action
* @param {Array<Array<String>>} formattedParseData
* @return {null}
*/
export default async function scheduleSecondAndSubsequentActions(action, formattedParseData) {
  let secondActionPromise = scheduleSecondAction(formattedParseData, action);
  await secondActionPromise;
  scheduleSubsequentActions(formattedParseData, action);
}

/**
* Schedule the second action. Since the time between the first action
* and second action is variable, we have to find the millisecondsUntilFirstNewQuery
* for each interval between the first and second action.
*
* @param {Array<Array<String>>} formattedParseData
* @param {Function} action
* @return {Promise} secondActionPromise
*/
function scheduleSecondAction(formattedParseData, action) {
  const millisecondsUntilFirstNewQuery = TIME_UTIL.findMillisecondsUntilNext15MinuteInterval();
  let secondClipLoadPromise = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      action(formattedParseData);
      resolve();
    }, millisecondsUntilFirstNewQuery);
    updateAsyncIds(id, action);
  });

  return secondClipLoadPromise;
}

/**
* Schedule all actions after the second action. The time between the
* second action and subsequent actions is always 15 minutes.
*
* @param {Array<Array<String>>} formattedParseData
* @return {null}
*/
function scheduleSubsequentActions(formattedParseData, action) {
  const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
  let id = setInterval(() => action(formattedParseData), fifteenMinutesInMilliseconds);
  updateAsyncIds(id, action);
}

function updateAsyncIds(id, action) {
  ASYNC_TASK_IDs.push({ id, action: action.prototype.name });
}

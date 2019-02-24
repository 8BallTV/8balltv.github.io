import * as TIME_UTIL from '../utils/time.js';

/*
* Keep track of async tasks by referencing their id and the action
* being performed
*/
const ASYNC_TASKS = [];
const ASYNC_TYPE = { timeout: 0, interval: 1 };

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
  let secondActionPromise = scheduleSecondAction(action, formattedParseData);
  await secondActionPromise;
  scheduleSubsequentActions(action, formattedParseData);
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
function scheduleSecondAction(action, formattedParseData) {
  const millisecondsUntilFirstNewQuery = TIME_UTIL.findMillisecondsUntilNext15MinuteInterval();
  let secondClipLoadPromise = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      action(formattedParseData);
      resolve();
    }, millisecondsUntilFirstNewQuery);
    updateAsyncIds(id, action, ASYNC_TYPE.timeout);
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
function scheduleSubsequentActions(action, formattedParseData) {
  const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
  let id = setInterval(() =>  action(formattedParseData), fifteenMinutesInMilliseconds);
  updateAsyncIds(id, action, ASYNC_TYPE.interval);
}

function updateAsyncIds(id, action, asyncType) {
  ASYNC_TASKS.push({ id, action: action.prototype.constructor.name, asyncType });
}

export function clearSchedulerTasks() {
  ASYNC_TASKS.forEach( (task, i) => {
    if(task.action === 'setNowText') {
      const id = task.id;
      task.asyncType === "timeout" ?   clearTimeout(id) : clearInterval(id);
      ASYNC_TASKS.splice(i, 1);
    }
  });
}

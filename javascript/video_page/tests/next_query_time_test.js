import { findMillisecondsUntilNext15MinuteInterval } from "../../utils/time.js";
import { generateTestMessages } from "../../utils/tests.js";

batchTestRunner();

/**
 * @author samdealy
 * @description Run the test scenarios for the video_page
 * @param {Array<ClipDataObject>} formattedParseData
 * @return {null}
 * @todo TODO Combine with filename_playbacktests batchTestRunner method
 */
function batchTestRunner() {
  const testCases = generateTestCases();
  for (let i = 0; i < testCases.length; i++) {
    const date = testCases[i][0];
    const expectedTime = testCases[i][1];
    const actualTime = findMillisecondsUntilNext15MinuteInterval(date, true);

    let pass = expectedTime === actualTime ? true : false;
    generateTestMessages(pass, i);
    if (!pass) generateErrorMessages(expectedTime, actualTime);
  }
}

/**
 * @author samdealy
 * @description Make the test cases for the batchTestRunner
 * @param {null}
 * @return {Array<DateObject, Number>} testCases
 */
function generateTestCases() {
  const testCases = [
    [new Date("Thu, 01 Jan 2019 08:02:36"), 744 * 1000],
    [new Date("Thu, 01 Jan 2019 04:42:17"), (60 - 17 + (45 - 43) * 60) * 1000],
    [new Date("Thu, 01 Jan 2019 12:00:00"), 15 * 60 * 1000],
    [new Date("Thu, 01 Jan 2019 12:35:30"), (30 + (45 - 36) * 60) * 1000],
    [new Date("Thu, 01 Jan 2019 11:59:59"), 1 * 1000],
    [new Date("Thu, 01 Jan 2019 01:30:00"), 15 * 60 * 1000],
  ];

  return testCases;
}

/**
 * @author samdealy
 * @description Generate error messages for the next_query_time test
 * @param {String} expectedTime
 * @param {String} actualTime
 * @return {null}
 */
function generateErrorMessages(expectedTime, actualTime) {
  const colorString = "color:red";
  console.log(`    %cExpected time was: ${expectedTime}`, colorString);
  console.log(`    %cActual time was: ${actualTime}`, colorString);
}

/* TESTING */
import { findFileNameAndCalculatePlaybackStartTime } from '../parser.js';
import { MONDAY } from '../constants.js';
import { generateTestMessages, generateErrorMessageForParserTests } from './utils.js';

Papa.parse( MONDAY, {
	download: true,
	complete: csvParseResults =>  batchTestRunner(csvParseResults)
});

function generateTestCases() {
	const testCasesArray = [
		[ new Date('Thu, 01 Jan 2019 08:02:36'), "result.mp3", 156 ],
		[ new Date('Thu, 01 Jan 2019 04:42:17'), "continued.mp3", (30 + 12) * 60 + 17],
		[ new Date('Thu, 01 Jan 2019 12:00:00'), "planet.mp3", 0 ],
		[ new Date('Thu, 01 Jan 2019 12:15:00'), "planet.mp3", 900 ],
		[ new Date('Thu, 01 Jan 2019 11:59:59'), "sunlight.mp3", (45 + 14) * 60 + 59],
		[ new Date('Thu, 01 Jan 2019 01:30:00'), "future.mp3", 30 * 60],
	]

	return testCasesArray.map( testCase => {
		return { time: testCase[0],
						expectedFileName: testCase[1],
						expectedtimeToStartPlayingVideo: testCase[2]
					};
	});
}

function batchTestRunner(csvParseResults) {
	const testCases = generateTestCases();
	for(let i = 0; i < testCases.length; i++) {
		const currentTestCase = testCases[i];
		const { time, expectedFileName, expectedtimeToStartPlayingVideo } = currentTestCase;

		const actual = findFileNameAndCalculatePlaybackStartTime(csvParseResults, time, true);

		let pass = false;
		if(expectedFileName === actual['fileName'] &&
			expectedtimeToStartPlayingVideo === actual['timeToStartPlayingVideo']) {
				pass = true;
		} else {
			  pass = false;

		}

		generateTestMessages(pass, i);
		if(!pass) {
			generateErrorMessageForParserTests(expectedFileName, expectedtimeToStartPlayingVideo, actual);
		}
	}
}

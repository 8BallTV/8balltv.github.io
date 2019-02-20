import findVideoPlayerClipInfo from '../find_clip_info.js';
import parseCSV from '../parser.js';
import { generateTestMessages, generateErrorMessageForParserTests } from '../utils/tests.js';
import { testURL } from '../utils/dev_constants.js';

// const csvSheetURLsByDay = createCSVSheetURLsByDay();
// const monday = csvSheetURLsByDay.monday;
// const testURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCmu8vTzD_R7L2iqEE0gdD43zbEnTUv5-_f6cHz1zX16JN6c2sdWKagLuOWPO8HBnbghfmInxWNwSz/pub?gid=438846256&single=true&output=tsv";
parseCSV(batchTestRunner, testURL);

function batchTestRunner(formattedParseData) {
	const testCases = generateTestCases();
	for(let i = 0; i < testCases.length; i++) {
		const currentTestCase = testCases[i];
		const { time, expectedFileName, expectedtimeToStartPlayingVideo } = currentTestCase;
		const actual = findVideoPlayerClipInfo(formattedParseData, time, true);
		let pass = false;
		if(expectedFileName === actual.fileName &&
			expectedtimeToStartPlayingVideo === actual.playbackTime) {
				pass = true;
		} else {
			  pass = false;

		}

		generateTestMessages(pass, i);
		if(!pass) {
			generateErrorMessageForParserTests(expectedFileName, expectedtimeToStartPlayingVideo, actual.fileName, actual.playbackTime);
		}
	}
}

function generateTestCases() {
	const testCasesArray = [
		[ new Date('Thu, 03 Jan 2019 23:18:36'), "surface.mp3", 1116],
		[ new Date('Thu, 03 Jan 2019 04:42:17'), "continued.mp3", (30 + 12) * 60 + 17],
		[ new Date('Thu, 03 Jan 2019 12:00:00'), "planet.mp3", 0],
		[ new Date('Thu, 03 Jan 2019 12:15:00'), "planet.mp3", 900],
		[ new Date('Thu, 03 Jan 2019 11:59:59'), "sunlight.mp3", (45 + 14) * 60 + 59],
		[ new Date('Thu, 03 Jan 2019 01:30:00'), "future.mp3", 30 * 60],
	]

	return testCasesArray.map( testCase => {
		return { time: testCase[0],
						expectedFileName: testCase[1],
						expectedtimeToStartPlayingVideo: testCase[2]
					};
	});
}

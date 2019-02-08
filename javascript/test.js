/* TESTING */
import { CSV_FILE_URL, findFileNameAndCalculatePlaybackStartTime } from './parser.js';

Papa.parse( CSV_FILE_URL, {
	download: true,
	complete: csvParseResults => { batchTestRunner(csvParseResults); }
});

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
	}

}

function generateTestMessages(pass, index) {
	const message = pass ? "passes" : "fails";
	const color = pass ? "green" : "red"
	console.log(`%cTest${index + 1} ${message}`, `color:${color}`);
	if(!pass) {
		generateDescriptiveErrorMessage(expectedFileName, expectedtimeToStartPlayingVideo, actual);
	}
}

function generateDescriptiveErrorMessage(expectedFileName, expectedtimeToStartPlayingVideo, actual) {
	colorString = "color:red";
	console.log(`    %cExpected file name was: ${expectedFileName}`, colorString);
	console.log(`    %cActual file name was: ${actual['fileName']}`, colorString);
	console.log(`    %cExpected playback start time was: ${expectedtimeToStartPlayingVideo}`, colorString);
	console.log(`    %cActual playback start time name was: ${actual['timeToStartPlayingVideo']}`, colorString);
}


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

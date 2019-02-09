export function generateTestMessages(pass, index) {
	const message = pass ? "passes" : "fails";
	const color = pass ? "green" : "red"
	console.log(`%cTest${index + 1} ${message}`, `color:${color}`);
	if(!pass) {
		generateDescriptiveErrorMessage(expectedFileName, expectedtimeToStartPlayingVideo, actual);
	}
}

export function generateErrorMessageForParserTests(expectedFileName, expectedtimeToStartPlayingVideo, actual) {
	colorString = "color:red";
	console.log(`    %cExpected file name was: ${expectedFileName}`, colorString);
	console.log(`    %cActual file name was: ${actual['fileName']}`, colorString);
	console.log(`    %cExpected playback start time was: ${expectedtimeToStartPlayingVideo}`, colorString);
	console.log(`    %cActual playback start time name was: ${actual['timeToStartPlayingVideo']}`, colorString);
}

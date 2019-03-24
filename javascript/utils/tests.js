/**
* @author samdealy
* @description Format and write test messages to the console
* @param {Boolean} pass
* @param {String} index
* @return {null}
*/
export function generateTestMessages(pass, index) {
	const message = pass ? "passes" : "fails";
	const color = pass ? "green" : "red"
	console.log(`%cTest${index + 1} ${message}`, `color:${color}`);
}

/**
* @author samdealy
* @description Format and write error messages to the console
* @param {String} expectedFileName
* @param {String} expectedtimeToStartPlayingVideo
* @param {String} actualFilename
* @param {String} actualPlaybackTime
* @return {null}
*/
export function generateErrorMessageForParserTests(expectedFileName, expectedtimeToStartPlayingVideo, actualFilename, actualPlaybackTime) {
	const colorString = "color:red";
	console.log(`    %cExpected file name was: ${expectedFileName}`, colorString);
	console.log(`    %cActual file name was: ${actualFilename}`, colorString);
	console.log(`    %cExpected playback start time was: ${expectedtimeToStartPlayingVideo}`, colorString);
	console.log(`    %cActual playback start time name was: ${actualPlaybackTime}`, colorString);
}

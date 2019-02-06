Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vRCmu8vTzD_R7L2iqEE0gdD43zbEnTUv5-_f6cHz1zX16JN6c2sdWKagLuOWPO8HBnbghfmInxWNwSz/pub?output=csv", {
	download: true,
	complete: results => {
		findFileNameAndCalculateTimeToStartPlaying(results);
	}
});

/*
	A callback function that gets called when the 8BallTV scheduling CSV
	file has been parsed. It first finds the file name for the current
	clip, which will be used to provide the video player with the correct
	source URL for the clip. The function then finds at which time to
	play the clip.

	
*/
function findFileNameAndCalculateTimeToStartPlaying(results) {
	const date = new Date();
	const clipDataObjectsArray = createClipDataObjectsArray(results);

	const currentClipDataObject = findCurrentClipDataObject(clipDataObjectsArray, date);
	const fileName = currentClipDataObject.fileName;

	const partNumber = currentClipDataObject.partNumber;

 	// TODO: figure out if the playback time should be in seconds or milliseconds
	const timeToStartPlayingVideo = calculateTimeToStartPlayingClip(partNumber, date);

	console.log(`File name is: ${fileName}`);
	console.log(`Time to start playing video is: ${timeToStartPlayingVideo}`);

	// TODO: Figure out how to schedule an update
}


/*
	Finds the ClipDataObject
*/
function findCurrentClipDataObject(clipDataObjectsArray, date) {
	const minutesPastMidnight = calculateMinutesPastMidnight(date);
	const indexOfFile = Math.floor(minutesPastMidnight / 15);
	const currentClipDataObject = clipDataObjectsArray[indexOfFile];

	return currentClipDataObject;
}

function calculateTimeToStartPlayingClip(partNumber, date) {
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const playbackMinutes = (partNumber - 1) * 15 + minutes % 15;

	const playbackSeconds = playbackMinutes * 60 + seconds;
	return playbackSeconds;
}

function calculateMinutesPastMidnight(date) {
	return date.getHours() * 60 + date.getMinutes();
}

function createClipDataObjectsArray(results) {
	clipDataObjectsArrayWithHeader = results.data.map((data, i) => {
		return { fileName: data[1], partNumber: data[2], title: data[3],
						 director: data[4] };
	});
	const clipDataObjectsArray = clipDataObjectsArrayWithHeader.slice(1);

	return clipDataObjectsArray;
}

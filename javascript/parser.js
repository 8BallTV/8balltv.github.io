/*
	This script loads the 8BallTV Schedule CSV file and determines
	which clip file to play and the time at which to start playback.
*/
export const CSV_FILE_URL = "https://docs.google.com/spreadsheets/d/e" +
											"/2PACX-1vRCmu8vTzD_R7L2iqEE0gdD43zbEnTUv5-" +
											"_f6cHz1zX16JN6c2sdWKagLuOWPO8HBnbghfmInxWN" +
											"wSz/pub?output=csv";

export function onPageLoad() {
	Papa.parse( CSV_FILE_URL, {
		download: true,
		complete: csvParseResults => {
			const currentTimeDateObject = new Date();
			findFileNameAndCalculatePlaybackStartTime(csvParseResults, currentTimeDateObject);
		}
	});
}




/*
	A callback function that gets called when the 8BallTV scheduling CSV
	file has been parsed.

	It first finds the file name for the current clip, which will be used
	to provide the video player with the correct source URL for the clip.
	The function then finds at which time to play the clip.
*/
export function findFileNameAndCalculatePlaybackStartTime(csvParseResults, date, test) {
	const clipDataObjectsArray = createClipDataObjectsArray(csvParseResults);

	const currentClipDataObject = findCurrentClipDataObject(clipDataObjectsArray, date);
	const fileName = currentClipDataObject.fileName;

	const partNumber = currentClipDataObject.partNumber;

 	// TODO: figure out if the playback time should be in seconds or milliseconds
	const timeToStartPlayingVideo = calculatePlaybackStartTime(partNumber, date);

	if(!test) {
		console.log(`Current File name is: ${fileName}`);
		console.log(`Current Time to start playing video is: ${timeToStartPlayingVideo}`);
	}

	return { fileName, timeToStartPlayingVideo };
	// TODO: Figure out how to schedule an update
}

/* Finds the ClipDataObject for the currently scheduled file */
function findCurrentClipDataObject(clipDataObjectsArray, date) {
	const minutesPastMidnight = calculateMinutesPastMidnight(date);

	const indexOfCurrentClipObject = Math.floor(minutesPastMidnight / 15);
	const currentClipDataObject = clipDataObjectsArray[indexOfCurrentClipObject];

	return currentClipDataObject;
}

/*
	 Calculate at which time the clip file should start playback.
	 The partNumber tells us if the clip is in a series- e.g. if
	 partNumber === 3, then it's the third clip in a series.

	 The way this function works is best explained via example. Say it's
	 8:52:36am, and the clip is part 2 in the series. Before proceeding
	 convince yourself that the clip should start playback at 22 min 36
	 seconds.

	 We know that we at least need to start playback
	 at the 15min mark (the first clip in the series occurs from the 0min
	 to 15min mark). The variable
	 "playbackOffSetDueToClipPositionInSeries" calculates this "offset".
	 (2 - 1) * 15 = 15

	 We then need to find how far into the 15 minute interval the clip's
	 playback should be. We know that the first part of the clip played
	 between 8:30am and 8:45am. So the second part should have started at
	 8:45. If it's 8:52 now, then we're 7 minutes into the second part of
	 the clip (52 - 45 = 7). The variable "playbackMinutesInto15MinuteInterval"
	 represents this.

	 Adding the two variables together, gives us the correct  minute
	 at which to start the playback- 15 + 7 = 22. Now, we just need to add t
	 he seconds to give us the precise time. Our example time is 8:52:36,
	 so that's 36 seconds past the minute.

	 If we were using a clock, this would be 22 minutes and 36 seconds.
	 But since we're dealing with computers, lets convert it to one
	 time unit. I chose to convert it to seconds (though we may need it
	 in milliseconds). The playbackseconds varible represents this.
*/
function calculatePlaybackStartTime(partNumber, date) {
	const [minutes, seconds] = [date.getMinutes(), date.getSeconds()];

	const playbackOffSetDueToClipPositionInSeries = (partNumber - 1) * 15;
	const playbackMinutesInto15MinuteInterval = minutes % 15;

	const playbackStartTimeMinutes =
	playbackOffSetDueToClipPositionInSeries +
		playbackMinutesInto15MinuteInterval;

	const playbackSeconds = playbackStartTimeMinutes * 60 + seconds;
	return playbackSeconds;
}

function calculateMinutesPastMidnight(date) {
	return date.getHours() * 60 + date.getMinutes();
}

function createClipDataObjectsArray(csvParseResults) {
  const	clipDataObjectsArrayWithHeader = csvParseResults.data.map((data, i) => {
		return { fileName: data[1], partNumber: data[2], title: data[3],
						 director: data[4] };
	});

	// Slice to get rid of the first entry, which is the CSV's column
	// headers
	const clipDataObjectsArray = clipDataObjectsArrayWithHeader.slice(1);

	return clipDataObjectsArray;
}

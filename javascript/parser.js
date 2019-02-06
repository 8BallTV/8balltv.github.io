Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vRCmu8vTzD_R7L2iqEE0gdD43zbEnTUv5-_f6cHz1zX16JN6c2sdWKagLuOWPO8HBnbghfmInxWNwSz/pub?output=csv", {
	download: true,
	complete: results => {
		findFileNameAndCalculatePlaybackStartTime(results);
	}
});

/*
	A callback function that gets called when the 8BallTV scheduling CSV
	file has been parsed. It first finds the file name for the current
	clip, which will be used to provide the video player with the correct
	source URL for the clip. The function then finds at which time to
	play the clip.


*/
function findFileNameAndCalculatePlaybackStartTime(results) {
	const date = new Date();
	const clipDataObjectsArray = createClipDataObjectsArray(results);

	const currentClipDataObject = findCurrentClipDataObject(clipDataObjectsArray, date);
	const fileName = currentClipDataObject.fileName;

	const partNumber = currentClipDataObject.partNumber;

 	// TODO: figure out if the playback time should be in seconds or milliseconds
	const timeToStartPlayingVideo = calculatePlaybackStartTime(partNumber, date);

	console.log(`File name is: ${fileName}`);
	console.log(`Time to start playing video is: ${timeToStartPlayingVideo}`);

	// TODO: Figure out how to schedule an update
}


/*
	Finds the ClipDataObject
*/
function findCurrentClipDataObject(clipDataObjectsArray, date) {
	const minutesPastMidnight = calculateMinutesPastMidnight(date);

	// Tricky logic:
	// 		1) There are 96 time slots per day. Starts at 0:00 and increments
	// 			 by 15 minutes until you get to the last one 23:45
	//       (0:00, 0:15, 0:30 ... 23:30, 23:45)
	// 		2) We can then map the minutes past midnight to the array index
	//       by flooring the quotient of minutesPastMidnight and 15.
	//        Note: To prove that this mapping works, let's use an example.
	//            --The fourth timeslot of the day starts at 0:45.
  //            			-- It goes from 0:45 up until 1:00.
	//						--The fourth element in the clipDataObjectsArray is the
	//            currentClipDataObject for this timeSlot.
	//            -- The fourth element in the clipDataObjectsArray occurs
	//               at index 3.
	//            -- For all the minutes in the range 0:45 (inclusive)
	//               and 1:00 (un-inclusive),
	//               Math.floor(time / 15) === 3
	//            -- This logic applies to any timeslot. Try it out on
	//               other timeslots to to convince yourself
	const indexOfCurrentClipDataObject = Math.floor(minutesPastMidnight / 15);
	const currentClipDataObject = clipDataObjectsArray[indexOfCurrentClipDataObject];

	return currentClipDataObject;
}

function calculatePlaybackStartTime(partNumber, date) {
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

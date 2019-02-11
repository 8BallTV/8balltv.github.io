# 8BallTV Scheduler
Welcome to the 8BallTV Scheduler repository. The scheduler is a
client-side, JavaScript approach to finding and playing the scheduled
8BallTV video at the correct playback time.

## Set-up
Follow these steps to test out the scheduler on your own machine
1. Git Clone this project. For help, click [here](https://help.github.com/articles/cloning-a-repository/).
	 Note the directory where you cloned the project on your local machine.
2. Open the Terminal application.
3. Use the "cd" command to navigate to the directory of the project.
4. On your terminal application, run `python -m http.server 8000`
	 * If you get a `-bash: python command not found`, that means
	   you don't have the Python interpreter installed on your computer.
	   To do so, go [here](https://www.python.org/downloads/).
5. Open up Google Chrome
6. Go to "http://localhost:8000/"
7. Open the developer console using CMD + Option + i.
8. You'll notice that the console is logging the current video and playback
	 time, in accordance with the Google Sheets Schedule.


## System Design
At a high-level, we parse the Google Sheet file, find the correct video
and its playback time for the current time, and set the video on the
video player.

### Schedule
The schedule lives in an Google sheet titled "8BALLTV"
scheduler, which can be found [here](). There is one sheet per day of
the week, and each day is divided into fifteen minute intervals starting
at 00:00 and going until 24:00. For each time slot, there are two
columns that are necessary for the parser to function correctly- File
Name and Part #. Additional columns provide video metadata.

### Parser
The parser.js script is the primary script for the scheduler. It asynchronously
parses the schedule (by converting the Google Sheet into a CSV file), and formats
the data for our use. It then
calls the main callback, in which we find and set the current video
and schedule subsequent video loads.

For more information about how we find the correct video file and the
playback time, consult the Note section below.

## External Libraries

### Papaparse
We use the [PapaParse library](https://www.papaparse.com/) to parse
the scheduler's CSV file. The library allows us to asynchronously
parse a remote CSV file, and pass the results into the aforementioned
main callback. The library claims to be the fatest browser-based CSV parser out there.

## Notes
### How we find the current clip: explaining the findClipDataObject function
1. There are 96 time slots per day. The first slot is at 0:00 and increments
by 15 minutes until you get to the last one 23:45 (0:00, 0:15, 0:30 ... 23:30, 23:45)
2. We can map the minutes past midnight to the array index
by flooring the quotient of minutesPastMidnight and 15.

To prove that this mapping works, let's use an example.
1. The fourth timeslot of the day starts at 0:45. It goes from 0:45 up until 1:00.
2. The fourth element in the clipDataObjectsArray is the currentClipDataObject for this timeSlot.
3. The fourth element in the clipDataObjectsArray occurs at index 3.
4. For all the minutes in the range 0:45 (inclusive) and 1:00 (un-inclusive):
    *  Math.floor(time / 15) === 3
5. This logic applies to any timeslot. Try it out oN other timeslots to to convince yourself


### How we find playback time: explaining the calculatePlaybackTime function
	The way this function works is best explained via example...

	Say it's 8:52:36am, and the clip is part 2 in the series.
	Assume that a multi-part clip is stored in one file, rather than
	multiple files. We need to figure out what time to start playback
	on the clip's file given the time and its part number.

	 First, we know that we at least need to start playback
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
	 at which to start the playback: 15 + 7 = 22. Now, we just need to add
	 the seconds to give us the precise time. Our example time is 8:52:36,
	 so that's 36 seconds past the minute.

	 If we were using a clock, this would be 22 minutes and 36 seconds.
	 But since we're dealing with computers, lets convert it to one
	 time unit. I chose to convert it to seconds (though we may need it
	 in milliseconds). The playbackSeconds variable represents this.

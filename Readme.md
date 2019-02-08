<h2>Note about logic in findCurrentClipDataObject function</h2>
1. There are 96 time slots per day. Starts at 0:00 and increments
by 15 minutes until you get to the last one 23:45 (0:00, 0:15, 0:30 ... 23:30, 23:45)
2. We can then map the minutes past midnight to the array index
by flooring the quotient of minutesPastMidnight and 15.

To prove that this mapping works, let's use an example.
1. The fourth timeslot of the day starts at 0:45. It goes from 0:45 up until 1:00.
2. The fourth element in the clipDataObjectsArray is the currentClipDataObject for this timeSlot.
3. The fourth element in the clipDataObjectsArray occurs at index 3.
4. For all the minutes in the range 0:45 (inclusive) and 1:00 (un-inclusive):
    *  Math.floor(time / 15) === 3
5. This logic applies to any timeslot. Try it out oN other timeslots to to convince yourself


<h2>Note about logic in calculatePlaybackStartTime</h2>


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
	 in milliseconds). The playbackSeconds variable represents this.

# Video Page

This directory contains the logic associated with finding the
current clip (find_clip_info.js) and playing that current clip (video_player.js).
It also handles scheduling future clip loads (schedule_clip_loads.js).

## Notes
### How we calculate playback time: calculatePlaybackTime
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

Adding the two variables together gives us the correct  minute
at which to start the playback: 15 + 7 = 22. Now, we just need to add
the seconds to give us the precise time. Our example time is 8:52:36,
so that's 36 seconds past the minute.

If we were using a clock, this would be 22 minutes and 36 seconds.
But since we're dealing with computers, lets convert it to one
time unit. I chose to convert it to seconds (though we may need it
in milliseconds). The playbackSeconds variable represents this.

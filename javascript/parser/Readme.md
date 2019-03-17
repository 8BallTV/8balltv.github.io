# Parser

This directory contains the logic associated with parsing the TSV
schedule file and formatting that data.

## Note
### How we find the current clip: findClipDataObject 
1. There are 96 time slots per day. The first slot is at 0:00 and increments
by 15 minutes until you get to the last one 23:45 (0:00, 0:15, 0:30 ... 23:30, 23:45)
2. We can map the minutes past midnight to the array index by flooring the quotient of minutesPastMidnight and 15.
To prove that this mapping works, let's use an example.
1. The fourth timeslot of the day starts at 0:45. It goes from 0:45 up until 1:00.
2. The fourth element in the clipDataObjectsArray is the currentClipDataObject for this timeSlot.
3. The fourth element in the clipDataObjectsArray occurs at index 3.
4. For all the minutes in the range 0:45 (inclusive) and 1:00 (un-inclusive):
		* Math.floor(time / 15) === 3
5. This logic applies to any timeslot. Try it out oN other timeslots to to convince yourself

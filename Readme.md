# 8balltv.github.io
Welcome to the 8balltv.github.io repository. The repo contains a
client-side, JavaScript approach to finding and playing the scheduled
8BallTV video at the correct playback time.

## Set-up
Follow these steps to test out the scheduler on your own machine
1. Git Clone this project.
   * For help, click [here](https://help.github.com/articles/cloning-a-repository/).
	   Note the directory where you cloned the project on your local machine.
2. Open the Terminal application on your MacOS.
3. Use the "cd" command to navigate to the directory of the project.
4. On your terminal application, run `python3 -m http.server 8000`
	 * If you get a `-bash: python3 command not found`, that means
	   you don't have the Python interpreter installed on your computer.
	   To do so, go [here](https://www.python.org/downloads/).
5. Open Google Chrome
6. Go to "http://localhost:8000/"
7. Open the developer console using `CMD + Option + i`.
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
The parser/index.js script is the primary script for the scheduler. It asynchronously
parses the schedule by converting the Google Sheet into a Tab Separated Values (TSV)
file and formatting the data for our use. We use a TSV file rather
than a Comma Separated Values (CSV) file because some of our titles have commas in them, and
using CSV wouldn't be able to parse these titles. It then calls the main callback, in which we find
 and set the current video and schedule subsequent video loads.

For more information about how we find the correct video file and the
playback time, consult the Note section below.

## External Libraries

### PapaParse
We use the [PapaParse library](https://www.papaparse.com/) to parse
the scheduler's TSV file. The library allows us to asynchronously
parse a remote TSV file, and pass the results into the aforementioned
main callback. The library claims to be the fatest browser-based TSV parser out there.

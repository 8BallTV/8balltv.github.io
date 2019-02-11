export default function formatAndPrintToConsole(date, fileName, partNumber, playbackTime) {
  const minutes = date.getMinutes();
  const minutesString = minutes < 10 ? "0" + minutes : minutes;

  const seconds = date.getSeconds();
  const secondsString = seconds < 10 ? "0" + seconds : seconds;
  console.log(`The time is: ${date.getHours()}:${minutesString}:${seconds}`);
  console.log(`The clip's file name is: ${fileName}`);
  console.log(`The clip is part number: ${partNumber}`);
  console.log(`The playback time is: ${playbackTime} seconds`);
  console.log(`    which is ${Math.floor(playbackTime / 60)} min and ${playbackTime % 60} seconds`);
  console.log(`Check out: https://docs.google.com/spreadsheets/d/1mFq_t7V6XY60zDM9IT-wQ2hBTGN8pjjs1zKvj7TG79w/edit#gid=845076906,`);
  console.log(`and navigate to the correct day and time to see if the correct video is playing at the correct playback time!`);
}

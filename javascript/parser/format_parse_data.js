/**
* Transforms the tsvParseResults into an array of clipDataObjects. The
* clipDataObject keys correspond to the TSV file's column headers.
*   NOTE: If we add columns to the spreadsheet, then we will need to
*         add keys to this object
*
* @param {Array<Array<String>>} tsvParseResults
* @return {Array<ClipDataObject>} formattedParseData
*/
export default function formatParseData(tsvParseResults) {
  const clipDataObjectsArrayWithTitle = tsvParseResults.data.map((data, i) => {
    return new ClipDataObject(
      /*id*/ data[1],
      /*partNumber*/ data[2],
      /*fileName*/ data[3],
      /*title*/ data[4],
      /*director*/ data[5]
    );
  });
  /*
  * Slice to get rid of the first entry,
  * which is the TSV's column title
  */
  const formattedParseData = clipDataObjectsArrayWithTitle.slice(1);
  return formattedParseData;
}

/**
* Finds a clipDataObject for a given number of minutes past midnight.
*     NOTE: See Readme for more information
*
* @param {Array<ClipDataObject>} formattedParseData
* @param {Number} minutesPastMidnight
* @return {ClipDataObject} clipDataObject
*/
export function findClipDataObject(formattedParseData, minutesPastMidnight) {
  const indexOfClipObject = findCurrentClipIndex(minutesPastMidnight);
  const clipDataObject = formattedParseData[indexOfClipObject];
  return clipDataObject;
}

/**
* Finds the current clip's index in the formattedParseData. The currentClipIndex
* also represents one less than the number video it is for the day.
*   E.g. If current clip index is 5, then it's the 6th video of the day.
*
* @return {Number} CurrentClipIndex
*/
export function findCurrentClipIndex(minutesPastMidnight) {
  return Math.floor(minutesPastMidnight / 15);
}

class ClipDataObject {
  constructor(id, partNumber,fileName, title, director) {
    this.id = id;
    this.partNumber = partNumber;
    this.fileName = fileName;
    this.title = title;
    this.director = director;
  }
}

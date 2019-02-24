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
      /**id*/ data[1],
      /**partNumber*/ data[2],
      /**fileName*/ data[3],
      /**title*/ data[4],
      /**director*/ data[5]
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
*
* @param {Array<ClipDataObject>} formattedParseData
* @param {Number} minutesPastMidnight
* @return {ClipDataObject} clipDataObject
*/
export function findClipDataObject(formattedParseData, minutesPastMidnight) {
  const indexOfClipObject = Math.floor(minutesPastMidnight / 15);
  const clipDataObject = formattedParseData[indexOfClipObject];
  return clipDataObject;
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

/*
* Transforms the csvParseResults into an array of clipDataObjects. The
* clipDataObject keys correspond to the CSV file's column headers.
*   NOTE: If we add columns to the spreadsheet, then we will need to
*         add keys to this
*
* @param {Array<Array<String>>} csvParseResults
* @return {Array<ClipDataObject>} formattedParseData
*/
export function formatParseData(csvParseResults) {
  const clipDataObjectsArrayWithTitle = csvParseResults.data.map((data, i) => {
    return new ClipDataObject(data[1], data[2], data[3], data[4]);
  });
  // Slice to get rid of the first entry,
  // which is the CSV's column title
  const formattedParseData = clipDataObjectsArrayWithTitle.slice(1);
  return formattedParseData;
}

class ClipDataObject {
  constructor(fileName, partNumber, title, director) {
    this.fileName = fileName;
    this.partNumber = partNumber;
    this.partNumber = partNumber;
    this.director = director;
  }
}

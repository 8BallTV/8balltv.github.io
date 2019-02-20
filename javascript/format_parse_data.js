/*
* Transforms the csvParseResults into an array of clipDataObjects. The
* clipDataObject keys correspond to the CSV file's column headers.
*   NOTE: If we add columns to the spreadsheet, then we will need to
*         add keys to this object
*
* @param {Array<Array<String>>} csvParseResults
* @return {Array<ClipDataObject>} formattedParseData
*/
export default function formatParseData(csvParseResults) {
  const clipDataObjectsArrayWithTitle = csvParseResults.data.map((data, i) => {
    return new ClipDataObject( /*id*/ data[1], /*partNumber*/ data[2],
      /*fileName*/ data[3], /*title*/ data[4], /*director*/ data[5]);
  });
  // Slice to get rid of the first entry,
  // which is the CSV's column title
  const formattedParseData = clipDataObjectsArrayWithTitle.slice(1);
  return formattedParseData;
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

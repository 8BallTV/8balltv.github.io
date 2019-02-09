export function formatParseData(csvParseResults) {
  const clipDataObjectsArrayWithTitle = csvParseResults.data.map((data, i) => {
    return {
      // Each key corresponds to a column in the CSV file
      fileName: data[1],
      partNumber: data[2],
      title: data[3],
      director: data[4]
    };
  });
  // Slice to get rid of the first entry, which is the CSV's column
  // title
  const clipDataObjectsArray = clipDataObjectsArrayWithTitle.slice(1);
  return clipDataObjectsArray;
}

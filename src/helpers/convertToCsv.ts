export const convertToCSV = (data: any[]) => {
    if (data.length === 0) return "";
  
    const keys = Object.keys(data[0]);
    const csvRows = [];
  
    // Add header row
    csvRows.push(keys.join(","));
  
    // Add data rows
    for (const row of data) {
      csvRows.push(keys.map(key => row[key]).join(","));
    }
  
    return csvRows.join("\n");
};
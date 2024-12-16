// fileExportUtils.ts

// Export events as JSON
export const exportEventsAsJSON = (events: object[], fileName: string): void => {
  const jsonBlob = new Blob([JSON.stringify(events, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(jsonBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// Export events as CSV
export const exportEventsAsCSV = (events: object[], fileName: string): void => {
  const csvHeader = "ID,Date,Name,Start Time,End Time,Description,Category\n";
  const csvRows = events
    .map((event: any) =>
      `${event.id},${event.date},${event.name},${event.startTime},${event.endTime},"${event.description || ""}",${event.category}`
    )
    .join("\n");

  const csvBlob = new Blob([csvHeader + csvRows], { type: "text/csv" });
  const url = URL.createObjectURL(csvBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

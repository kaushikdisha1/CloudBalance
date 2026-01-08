// utils/exportToExcel.js
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, groupByKey) => {
  if (!data || data.length === 0) {
    console.error("No data available to export.");
    return;
  }

  // Prepare headers dynamically
  const months = Array.from(new Set(
    data.map(item => item.USAGE_MONTH)
  )).sort();

  const headers = [
    groupByKey.replace(/_/g, " ").toUpperCase(),
    ...months,
    "Total"
  ];

  // Prepare rows
  const excelData = [];

  const groupedData = {};
  data.forEach(item => {
    const groupName = item[groupByKey] || "Others";
    if (!groupedData[groupName]) {
      groupedData[groupName] = {};
    }
    groupedData[groupName][item.USAGE_MONTH] = item.TOTAL_USAGE_COST;
  });

  Object.entries(groupedData).forEach(([groupName, monthData]) => {
    const row = {};
    row[groupByKey.replace(/_/g, " ").toUpperCase()] = groupName;
    let total = 0;

    months.forEach(month => {
      const cost = monthData[month] || 0;
      row[month] = cost.toFixed(2);
      total += cost;
    });

    row["Total"] = total.toFixed(2);
    excelData.push(row);
  });

  // Create Worksheet and Workbook
  const worksheet = XLSX.utils.json_to_sheet(excelData, { header: headers });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "CostData");

  // Write file and trigger download
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(fileData, `CostData_${new Date().toISOString()}.xlsx`);
};

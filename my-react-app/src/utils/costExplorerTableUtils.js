export const transformCostDataForTable = (costData, groupByKey) => {
    if (!Array.isArray(costData) || costData.length === 0 || !groupByKey) {
      return { columns: [], rows: [] };
    }
  
    // Step 1: Find unique months
    const months = Array.from(
      new Set(costData.map(item => item.USAGE_MONTH))
    ).sort();
  
    // Step 2: Group data by groupBy field (NO SORTING)
    const groupedData = {};
    costData.forEach(item => {
      const groupName = item[groupByKey] || "Others";
      if (!groupedData[groupName]) {
        groupedData[groupName] = {};
      }
      groupedData[groupName][item.USAGE_MONTH] = item.TOTAL_USAGE_COST;
    });
  
    // Step 3: Prepare rows (no sorting now)
    let idCounter = 1;
    const rows = Object.entries(groupedData).map(([groupName, monthData]) => {
      const row = { id: idCounter++, groupBy: groupName };
      let total = 0;
  
      months.forEach(month => {
        const value = monthData[month] || 0;
        row[month] = value;
        total += value;
      });
  
      row.total = total;
      return row;
    });
  
    // Step 4: Prepare columns
    const columns = [
      {
        field: "groupBy",
        headerName: groupByKey.replace(/_/g, " ").toUpperCase(),
        flex: 2,
      },
      ...months.map(month => ({
        field: month,
        headerName: month,
        flex: 1,
        type: "number",
        valueFormatter: (params) => params.value?.toFixed(2),
      })),
      {
        field: "total",
        headerName: "Total",
        flex: 1.5,
        type: "number",
        valueFormatter: (params) => params.value?.toFixed(2),
      },
    ];
  
    return { columns, rows };
  };
  
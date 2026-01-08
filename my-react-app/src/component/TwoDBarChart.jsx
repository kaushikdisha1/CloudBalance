// TwoDBarChart.jsx
import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

Charts(FusionCharts);
FusionTheme(FusionCharts);

const TwoDBarChart = ({ costData = [], groupByKey }) => {
  if (!costData.length || !groupByKey) return null;

  const uniqueMonths = Array.from(new Set(costData.map(d => d.USAGE_MONTH))).sort();
  const uniqueGroups = Array.from(new Set(costData.map(d => d[groupByKey] || "Others")));

  if (!uniqueGroups.length) return null;

  const categories = [{ category: uniqueMonths.map(month => ({ label: month })) }];

  const dataset = uniqueGroups.map(group => ({
    seriesname: group,
    data: uniqueMonths.map(month => {
      const record = costData.find(
        r => r.USAGE_MONTH === month && (r[groupByKey] || "Others") === group
      );
      return { value: record?.TOTAL_USAGE_COST ?? 0 }; // ✅ number, not string
    }),
  }));

  const dataSource = {
    chart: {
      caption: "Cloud Cost Explorer",
      xAxisName: "Month",
      yAxisName: "Total Cost ($)",
      numberPrefix: "$",
      theme: "fusion",
      showValues: "0",
    },
    categories,
    dataset,
  };

  return (
    <ReactFusioncharts
      type="mscolumn2d"
      width="100%"
      height="400"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default TwoDBarChart;

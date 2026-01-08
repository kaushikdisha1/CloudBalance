// LineChart.jsx
import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

Charts(FusionCharts);
FusionTheme(FusionCharts);

const LineChart = ({ costData = [], groupByKey }) => {
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
      return { value: record?.TOTAL_USAGE_COST ?? 0 }; // ✅ number
    }),
  }));

  const dataSource = {
    chart: {
      caption: "Cloud Cost Trend",
      xAxisName: "Month",
      yAxisName: "Total Cost ($)",
      numberPrefix: "$",
      theme: "fusion",
      lineThickness: "2",
      anchorRadius: "4",
      showLegend: "1",
      legendPosition: "bottom",
    },
    categories,
    dataset,
  };

  return (
    <ReactFusioncharts
      type="msline"
      width="100%"
      height="400"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default LineChart;

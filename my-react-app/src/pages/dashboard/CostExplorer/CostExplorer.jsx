import React, { useState, useEffect } from "react";
import { getApi, postApi } from "../../../services/apiService";
import AccountDropdown from "../../../component/AccountDropDown";
import GroupByTabs from "../../../component/GroupBy";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import FilterSidebar from "../../../component/FilterSideBar";
import { toast } from "react-toastify";
import TwoDBarChart from "../../../component/TwoDBarChart";
import LineChart from "../../../component/LineChart";
import MuiDataTable from "../../../component/table/DataTable";
import { transformCostDataForTable } from "../../../utils/costExplorerTableUtils";
import { exportToExcel } from "../../../utils/exportToExcel";
import ScopeLoader from "../../../component/ScopeLoader";

const CostExplorer = () => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);

  const [groupByOptions, setGroupByOptions] = useState([]);
  const [currentGroup, setCurrentGroup] = useState("");

  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [sidebarLoading, setSidebarLoading] = useState(false);
  const [filtersMap, setFiltersMap] = useState({});

  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const [costData, setCostData] = useState([]);
  const [costLoading, setCostLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Request payload for API calls
  const requestPayload = {
    startMonth,
    endMonth,
    groupBy: currentGroup,
    filters: filtersMap,
    accountNumber: selectedAccountNumber,
  };

  // ===== Download Excel =====
  const handleDownloadExcel = async () => {
    try {
      const fetchingToast = toast.loading("Fetching data for download...");
      const res = await postApi("/snowflake/complete-cost", requestPayload);
      const downloadData = res.data.data || [];

      if (!downloadData.length) {
        toast.update(fetchingToast, {
          render: "No data available ❗",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      toast.update(fetchingToast, {
        render: "Download started 🚀",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      exportToExcel(downloadData, currentGroup);
    } catch (err) {
      toast.error("Failed to download excel ❌");
    }
  };

  // ===== Fetch Accounts =====
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getApi("/accounts");
        const accounts = res.data || [];
        setAllAccounts(accounts);
        if (accounts.length) setSelectedAccountNumber(accounts[0].accountNumber);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };
    fetchAccounts();
  }, []);

  // ===== Fetch GroupBy Options =====
  useEffect(() => {
    const fetchGroupBy = async () => {
      setLoading(true);
      try {
        const res = await getApi("/snowflake/group-by-options");
        const data = res.data.data || [];

        // Map API data to objects expected by GroupByTabs
        const options = data.map((name, idx) => ({
          id: idx + 1,
          groupName: name,
          displayName: name.replace(/_/g, " "),
        }));

        setGroupByOptions(options);
        setFilterOptions(options);

        // Initialize currentGroup if not set
        if (options.length && !currentGroup) {
          setCurrentGroup(options[0].groupName);
        }
      } catch (err) {
        console.error("Error fetching groupBy options:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroupBy();
  }, [currentGroup]);

  // ===== Fetch Cost Data =====
  useEffect(() => {
    const fetchCostData = async () => {
      if (!currentGroup || !selectedAccountNumber) return;

      setCostLoading(true);
      try {
        const res = await postApi("/snowflake/cost", requestPayload);
        const data = res.data.data || [];
        setCostData(data);

        if (!data.length) toast.info("No cost data found ❗");
      } catch (err) {
        setCostData([]);
        toast.error("Failed to fetch cost data ❌");
      } finally {
        setCostLoading(false);
      }
    };
    fetchCostData();
  }, [currentGroup, filtersMap, startMonth, endMonth, selectedAccountNumber]);

  if (loading) return <ScopeLoader />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Cost Explorer</h2>
          <p>Always be aware of cost changes and history</p>
        </div>
        <AccountDropdown
          accounts={allAccounts}
          selectedAccountNumber={selectedAccountNumber}
          onChange={(e) => setSelectedAccountNumber(e.target.value)}
          label="Select Account"
        />
      </div>

      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">
        <GroupByTabs
          groupByOptions={groupByOptions}
          onSelect={setCurrentGroup}
        />
        <div className="flex items-center gap-2">
          <input
            type="month"
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          />
          <input
            type="month"
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          />
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setFiltersMap({})}
          >
            Clear Filters
          </button>
          <IconButton onClick={() => setShowFilterSidebar((p) => !p)}>
            <FilterListIcon />
          </IconButton>
        </div>
      </div>

      {/* Charts */}
      <div className="relative min-h-[400px]">
        {costLoading ? (
          <ScopeLoader />
        ) : (
          <TwoDBarChart costData={costData} groupByKey={currentGroup} />
        )}
      </div>
      <div className="relative min-h-[400px]">
        {costLoading ? (
          <ScopeLoader />
        ) : (
          <LineChart costData={costData} groupByKey={currentGroup} />
        )}
      </div>

      {/* Download Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadExcel}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Download Excel
        </button>
      </div>

      {/* Table */}
      <div className="relative min-h-[400px]">
        {costLoading ? (
          <ScopeLoader />
        ) : costData.length === 0 ? (
          <p className="text-center text-gray-600">No cost data available.</p>
        ) : (
          (() => {
            const { columns, rows } = transformCostDataForTable(costData, currentGroup);
            return <MuiDataTable columns={columns} rows={rows} pageSize={10} />;
          })()
        )}
      </div>

      {/* Filter Sidebar */}
      {showFilterSidebar && (
        <FilterSidebar
          sidebarLoading={sidebarLoading}
          setSidebarLoading={setSidebarLoading}
          filterOptions={filterOptions}
          filtersMap={filtersMap}
          setFiltersMap={setFiltersMap}
        />
      )}
    </div>
  );
};

export default CostExplorer;

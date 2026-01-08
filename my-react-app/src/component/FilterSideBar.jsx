import React, { useState } from "react";
import ScopeLoader from "./ScopeLoader";
import { getApi } from "../services/apiService";

const FilterSideBar = ({
  sidebarLoading,
  setSidebarLoading,
  filterOptions,
  setFiltersMap,
  filtersMap,
}) => {
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [innerFilters, setInnerFilters] = useState({});
  const [localSelected, setLocalSelected] = useState({});
  const [searchQueryMap, setSearchQueryMap] = useState({});

  const fetchInnerFilters = async (filterName) => {
    const trimmedFilter = filterName.trim();
    try {
      setSidebarLoading(true);
      const res = await getApi(
        `snowflake/filters?groupBy=${encodeURIComponent(trimmedFilter)}`
      );
      const values = res.data.data;

      setInnerFilters((prev) => ({
        ...prev,
        [filterName]: values,
      }));

      // Set localSelected to either existing applied values or empty
      setLocalSelected((prev) => ({
        ...prev,
        [filterName]: filtersMap[filterName] || [],
      }));

      setExpandedFilter(filterName);
    } catch (err) {
      console.error("Failed to fetch inner filters", err);
    } finally {
      setSidebarLoading(false);
    }
  };

  const handleFilterClick = (filterName) => {
    if (expandedFilter === filterName) {
      setExpandedFilter(null);
    } else if (!innerFilters[filterName]) {
      fetchInnerFilters(filterName);
    } else {
      setLocalSelected((prev) => ({
        ...prev,
        [filterName]: filtersMap[filterName] || [],
      }));
      setExpandedFilter(filterName);
    }
  };

  const handleInnerCheckboxChange = (filterName, value) => {
    setLocalSelected((prev) => {
      const current = prev[filterName] || [];
      return {
        ...prev,
        [filterName]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleApply = (filterName) => {
    setFiltersMap((prev) => ({
      ...prev,
      [filterName]: localSelected[filterName] || [],
    }));
    setExpandedFilter(null); // Collapse
  };

  const handleClose = () => {
    setSearchQueryMap((prev) => ({
      ...prev,
      [expandedFilter]: "",
    }));
    setExpandedFilter(null);
  };

  return (
    <aside className="relative w-[300px] bg-white border-l shadow-md p-4 overflow-y-auto">
      {sidebarLoading && <ScopeLoader />}
      <nav
        className={`${sidebarLoading ? "opacity-30 pointer-events-none" : ""}`}
      >
        <ul>
          {filterOptions.map((filter) => {
            // const applied = filtersMap[filter.groupName] || [];

            return (
              <li key={filter.id} className="p-2 rounded hover:bg-gray-100">
                {/* Filter Label */}
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleFilterClick(filter.groupName)}
                >
                  <span className="text-sm font-medium">
                    {filter.displayName}
                  </span>
                  <span className="text-xs">
                    {expandedFilter === filter.groupName ? "▲" : "▼"}
                  </span>
                </div>
                {/* Search Box */}
                {expandedFilter === filter.groupName && (
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1 mb-2 mt-2"
                    value={searchQueryMap[filter.groupName] || ""}
                    onChange={(e) =>
                      setSearchQueryMap((prev) => ({
                        ...prev,
                        [filter.groupName]: e.target.value,
                      }))
                    }
                  />
                )}

                {/* Inner Filter Checkboxes */}
                {expandedFilter === filter.groupName &&
                  innerFilters[filter.groupName] && (
                    <>
                      <ul className="ml-4 mt-2 space-y-1 max-h-40 overflow-y-auto">
                        {innerFilters[filter.groupName]
                          .filter((val) =>
                            val
                              .toLowerCase()
                              .includes(
                                (
                                  searchQueryMap[filter.groupName] || ""
                                ).toLowerCase()
                              )
                          )
                          .map((val, idx) => (
                            <li key={idx} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`${filter.id}-${idx}`}
                                className="mr-2"
                                checked={
                                  localSelected[filter.groupName]?.includes(
                                    val
                                  ) || false
                                }
                                onChange={() =>
                                  handleInnerCheckboxChange(
                                    filter.groupName,
                                    val
                                  )
                                }
                              />
                              <label
                                htmlFor={`${filter.id}-${idx}`}
                                className="text-sm"
                              >
                                {val}
                              </label>
                            </li>
                          ))}
                      </ul>

                      {/* Buttons */}
                      <div className="flex justify-end gap-2 mt-3 pr-2">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                          onClick={() => handleApply(filter.groupName)}
                        >
                          Apply
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500"
                          onClick={handleClose}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default FilterSideBar;

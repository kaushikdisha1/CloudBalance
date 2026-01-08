import React, { useEffect, useState } from "react";

const GroupByTabs = ({ groupByOptions = [], onSelect }) => {
  const [selectedGroupBy, setSelectedGroupBy] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [reorderedOptions, setReorderedOptions] = useState([]);

  useEffect(() => {
    if (groupByOptions?.length > 0) {
      const defaultValue = groupByOptions[0].groupName;
      setSelectedGroupBy(defaultValue);
      setReorderedOptions(groupByOptions);
      onSelect && onSelect(defaultValue); // notify parent
    }
  }, [groupByOptions]);

  const handleSelection = (groupName) => {
    setSelectedGroupBy(groupName);
    onSelect && onSelect(groupName);

    // Reorder selected option to first
    const selected = reorderedOptions.find((g) => g.groupName === groupName);
    const others = reorderedOptions.filter((g) => g.groupName !== groupName);
    setReorderedOptions([selected, ...others]);
    setShowMore(false); // close more menu
  };

  const visibleTabs = reorderedOptions.slice(0, 6);
  const moreTabs = reorderedOptions.slice(6);

  return (
    <div className="flex items-center gap-2 flex-wrap relative">
      <span className="font-medium text-sm">Group By:</span>

      {visibleTabs.map((option) => (
        <button
          key={option.id}
          className={`px-3 py-1 text-sm rounded transition ${
            selectedGroupBy === option.groupName
              ? "bg-blue-700 text-white"
              : "bg-white border border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => handleSelection(option.groupName)}
        >
          {option.displayName}
        </button>
      ))}

      {moreTabs.length > 0 && (
        <div className="relative">
          <button
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => setShowMore((prev) => !prev)}
          >
            More ▼
          </button>

          {showMore && (
            <div className="absolute z-10 mt-2 bg-white border rounded shadow-md w-48 max-h-60 overflow-auto">
              {moreTabs.map((option) => (
                <div
                  key={option.id}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    selectedGroupBy === option.groupName ? "font-semibold bg-blue-50" : ""
                  }`}
                  onClick={() => handleSelection(option.groupName)}
                >
                  {option.displayName}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupByTabs;

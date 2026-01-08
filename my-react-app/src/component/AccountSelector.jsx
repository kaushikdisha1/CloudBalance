import React from "react";

const AccountSelector = ({
  allAccounts = [],
  selectedAccounts = [],
  onAddAccount = () => {},
  onRemoveAccount = () => {},
}) => {
  return (
    <div className="col-span-2 bg-gray-50 border border-gray-300 p-4 rounded-md">
      <h3 className="text-md font-semibold mb-3">Assign Accounts</h3>

      <div className="grid grid-cols-2 gap-6">
        {/* All Accounts (only unassigned accounts) */}
        <div>
          <h4 className="font-medium mb-2">All Accounts</h4>
          <div className="max-h-40 overflow-y-auto border p-2 rounded">
            {allAccounts
              .filter(
                (acc) =>
                  !selectedAccounts.includes(acc.id) &&
                  !selectedAccounts.some((a) => a.id === acc.id)
              )
              .map((acc) => (
                <div
                  key={acc.id}
                  className="flex items-center justify-between py-1"
                >
                  <span>
                    {acc.accountName} ({acc.accountNumber})
                  </span>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => onAddAccount(acc)}
                  >
                    Add
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Selected Accounts */}
        <div>
          <h4 className="font-medium mb-2">Selected Accounts</h4>
          <div className="max-h-40 overflow-y-auto border p-2 rounded">
            {allAccounts
              .filter(
                (acc) =>
                  selectedAccounts.includes(acc.id) ||
                  selectedAccounts.some((a) => a.id === acc.id)
              )
              .map((acc) => (
                <div
                  key={acc.id}
                  className="flex items-center justify-between py-1"
                >
                  <span>
                    {acc.accountName} ({acc.accountNumber})
                  </span>
                  <button
                    type="button"
                    className="text-red-500 hover:underline text-sm"
                    onClick={() => onRemoveAccount(acc.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSelector;

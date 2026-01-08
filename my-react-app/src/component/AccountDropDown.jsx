import React from "react";

const AccountDropdown = ({
  accounts = [],
  selectedAccountNumber = null,
  onChange,
  label = "Select Account",
  name = "accountNumber",
  required = false,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        id={name}
        name={name}
        value={selectedAccountNumber ?? ""}
        onChange={onChange}
        required={required}
        className={`border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        <option value="" disabled>
          -- Select an account --
        </option>
        {accounts.map((account, index) => (
          <option key={index} value={account.accountNumber}>
            {account.accountName} ({account.accountNumber})
          </option>
        ))}
      </select>
    </div>
  );
};

export default AccountDropdown;

import React, { useState, useEffect } from "react";
import MuiDataTable from "../../../component/table/DataTable";
import { getApi } from "../../../services/apiService";
import AccountDropdown from "../../../component/AccountDropDown";
import services, {
  ec2TableColumns,
  rdsTableColumns,
  asgTableColumns,
} from "./serviceConfig";
import CenteredLoader from "../../../component/CenteredLoader";
const AwsServices = () => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getApi("/accounts");
        const accounts = res.data
        setAllAccounts(res.data);
        if (accounts.length > 0) {
          setSelectedAccountNumber(accounts[0].accountNumber);
        }

        if (services.length > 0) {
          setSelectedService(services[0].serviceType); 
        }
      } catch (err) {
        console.error("Failed to fetch accounts", err);
      }
    };

    fetchAccounts();
  }, []);


  useEffect(() => {
    const fetchServiceData = async () => {
      if (!selectedAccountNumber || !selectedService) return;

      setLoading(true);
      try {
        const res = await getApi(
          `/aws/${selectedService}?accountNumber=${selectedAccountNumber}`
        );
        setTableData(
          res.data.map((item, idx) => ({
            id: idx + 1,
            ...item,
          }))
        );
      } catch (err) {
        console.error(`Error fetching ${selectedService} data:`, err);
        setTableData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [selectedAccountNumber, selectedService]);

  const columnMap = {
    ec2: ec2TableColumns,
    rds: rdsTableColumns,
    asg: asgTableColumns,
  };

  return (
    <>
      {loading && <CenteredLoader />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">AWS Services</h2>
        <div>
          <AccountDropdown
            accounts={allAccounts}
            selectedAccountNumber ={selectedAccountNumber}
            onChange={(e) => setSelectedAccountNumber(e.target.value)}
            label="Select Account"
            name="arnNumber"
            required={true}
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 mb-6">
        {services.map((service) => (
          <div
            key={service.serviceType}
            onClick={() => setSelectedService(service.serviceType)}
            className={`cursor-pointer px-4 py-2 rounded-md transition-all border ${
              selectedService === service.serviceType
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-blue-100'
            }`}
          >
            {service.serviceName}
          </div>
        ))}
      </div>
      <div className="mt-4">
        {selectedService && (
          <>
            <h3 className="text-lg font-medium mb-2 capitalize">
              {selectedService.toUpperCase()} Instances
            </h3>
            <MuiDataTable
              columns={columnMap[selectedService] || []}
              rows={tableData}
            />
          </>
        )}
      </div>

    </>
  );
};
export default AwsServices;
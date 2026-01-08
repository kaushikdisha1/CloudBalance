import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userConfig from "./userDetailsConfig";
import FormRenderer from "../../../../component/form/FormRender";
import CommonButton from "../../../../component/button";
import { getApi, postApi } from "../../../../services/apiService";
import { toast } from "react-toastify";
import AccountSelector from "../../../../component/AccountSelector";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    accounts: [],
  });

  const [allAccounts, setAllAccounts] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch all accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getApi("/accounts");
        setAllAccounts(res.data || res);
      } catch (err) {
        console.error("Failed to fetch accounts", err);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    // validate field if needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const payload = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`, // send full name to backend
        accounts:
          formData.role === "CUSTOMER"
            ? formData.accounts.map((a) => a.id)
            : [],
      };

      await postApi("/users", payload);
      toast.success("User created successfully");
      navigate("/dashboard/users");
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      toast.error(backendMessage || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="px-8 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-2">
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate("/dashboard/users")}
        >
          Users
        </span>{" "}
        / Add New User
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New User
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white p-6 rounded-xl shadow border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
      >
        <FormRenderer
          fields={userConfig}
          data={formData}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
        />

        {formData.role === "CUSTOMER" && (
          <AccountSelector
            allAccounts={allAccounts}
            selectedAccounts={formData.accounts}
            onAddAccount={(acc) =>
              setFormData((prev) => ({
                ...prev,
                accounts: [...prev.accounts, acc],
              }))
            }
            onRemoveAccount={(id) =>
              setFormData((prev) => ({
                ...prev,
                accounts: prev.accounts.filter((a) => a.id !== id),
              }))
            }
          />
        )}

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center mt-4">
          <CommonButton
            type="submit"
            text="Create User"
            fullWidth={false}
            className="w-40"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;

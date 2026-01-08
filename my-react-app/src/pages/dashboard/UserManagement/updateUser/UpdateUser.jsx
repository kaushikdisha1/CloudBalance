import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormRenderer from "../../../../component/form/FormRender";
import userUpdateConfig from "./updateUserConfig";
import { getApi, putApi } from "../../../../services/apiService";
import { toast } from "react-toastify";
import CommonButton from "../../../../component/button";
import AccountSelector from "../../../../component/AccountSelector";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    accounts: [],
  });

  const [allAccounts, setAllAccounts] = useState([]);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getApi(`/users/${id}`);
        const userData = res.data?.data || res.data;

        // Split full name into firstName and lastName
        const nameParts = (userData.name || "").split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        setUser({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          role: userData.role || "",
          accounts: userData.accounts || [],
        });
      } catch (err) {
        toast.error("Failed to fetch user: " + err.message);
      }
    };

    fetchUser();
  }, [id]);

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
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Join firstName and lastName for backend
      const payload = {
        ...user,
        name: `${user.firstName} ${user.lastName}`,
        accounts: user.role === "CUSTOMER" ? user.accounts : [],
      };

      await putApi(`/users/${id}`, payload);
      toast.success("User updated successfully!");
      navigate("/dashboard/users");
    } catch (error) {
      toast.error("Failed to update user");
      console.error(error);
    }
  };

  return (
    <div className="px-8 py-6">
      <div className="text-sm text-gray-500 mb-2">
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate("/dashboard/users")}
        >
          Users
        </span>{" "}
        / Update User
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Update User
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white p-6 rounded-xl shadow border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
      >
        <FormRenderer
          fields={userUpdateConfig}
          data={user}
          onChange={handleChange}
          errors={{}}
        />

        {user.role === "CUSTOMER" && (
          <AccountSelector
            allAccounts={allAccounts}
            selectedAccounts={user.accounts}
            onAddAccount={(acc) =>
              setUser((prev) => ({
                ...prev,
                accounts: [...prev.accounts, acc.id],
              }))
            }
            onRemoveAccount={(id) =>
              setUser((prev) => ({
                ...prev,
                accounts: prev.accounts.filter((accId) => accId !== id),
              }))
            }
          />
        )}

        <div className="col-span-2 flex justify-center mt-4">
          <CommonButton
            type="submit"
            text="Update User"
            fullWidth={false}
            className="w-40"
            sx={{ marginTop: 2 }}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;

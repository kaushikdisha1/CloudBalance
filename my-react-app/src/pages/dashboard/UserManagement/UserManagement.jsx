import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getApi } from "../../../services/apiService";
import { getUserTableColumns } from "../../../component/userTableConfig";
import MuiDataTable from "../../../component/table/DataTable";
import CommonButton from "../../../component/button";

// name resolver (already correct)
const resolveNames = (user) => {
  if (user.firstName || user.lastName) {
    return {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    };
  }

  if (user.name) {
    const parts = user.name.trim().split(" ");
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
  }

  return { firstName: "", lastName: "" };
};

const UserManagement = () => {
  const navigate = useNavigate();
  const user = useSelector((s) => s.userReducer.user);

  const [users, setUsers] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const fetchUsers = async (page, pageSize) => {
    setLoading(true);
    try {
      const res = await getApi(
        `/users?page=${page}&size=${pageSize}`
      );

      const content = res.data.content || [];
      const total = res.data.totalElements || 0;

      const normalized = content.map((u) => {
        const { firstName, lastName } = resolveNames(u);
        return {
          ...u,
          firstName,
          lastName,
          id: u.id,
        };
      });

      setUsers(normalized);
      setTotalRows(total);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  if (!user) return <div>Loading...</div>;

  const columns = getUserTableColumns(navigate, user.role);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>

        {user.role === "ADMIN" && (
          <CommonButton
            text="+ Add User"
            onClick={() => navigate("/dashboard/users/create-user")}
            className="px-4"
          />
        )}
      </div>

      <MuiDataTable
        columns={columns}
        rows={users}
        loading={loading}
        rowCount={totalRows}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
};

export default UserManagement;

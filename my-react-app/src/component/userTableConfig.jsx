import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

export const getUserTableColumns = (navigate, role) => {
  const columns = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email ID', flex: 2 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'accounts', headerName: 'Accounts', flex: 2 },
  ];

  // Add the update column only if role is not READ_ONLY
  if (role !== "READ_ONLY") {
    columns.push({
      field: 'update',
      headerName: 'Update',
      flex: 1,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'left',
      renderCell: (params) => (
        <IconButton
          onClick={() => navigate(`/dashboard/users/update-user/${params.row.id}`)}
          color="primary"
        >
          <EditIcon />
        </IconButton>
      ),
    });
  }

  return columns;
};

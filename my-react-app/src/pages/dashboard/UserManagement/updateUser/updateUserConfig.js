const userUpdateConfig = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
    required: true,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: [
      { value: "", label: "--Select Role--", disabled: true },
      { value: "ADMIN", label: "ADMIN" },
      { value: "CUSTOMER", label: "CUSTOMER" },
      { value: "READ_ONLY", label: "READ_ONLY" },
    ],
  },
];

export default userUpdateConfig;

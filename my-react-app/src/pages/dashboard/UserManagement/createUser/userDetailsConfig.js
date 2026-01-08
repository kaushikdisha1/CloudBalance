const userConfig = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
    required: true,
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: [
      { value: "", label: "--Select Role--" },
      { value: "ADMIN", label: "ADMIN" },
      { value: "CUSTOMER", label: "CUSTOMER" },
      { value: "READ_ONLY", label: "READ_ONLY" },
    ],
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    required: true,
    minlength: 8,
    maxlength: 20,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm password",
    required: true,
    minlength: 8,
    maxlength: 20,
  },
];

export default userConfig;

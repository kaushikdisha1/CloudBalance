const loginFields = [
    {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      label: "Email",
      errorMessage: "Please enter a valid email address",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
      minLength: 6,
      maxLength: 100,
      label: "Password",
      autoComplete: "current-password"
    },
  ];
  
  const loginButton = {
    text: "Login",
    type: "submit",
  };
  
  export { loginFields, loginButton };
  
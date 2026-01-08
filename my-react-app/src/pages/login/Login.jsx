import React, { useEffect, useState } from "react";
import cloudLogo from "../../images/image1.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/reducer";
import FormRenderer from "../../component/form/FormRender";
import CommonButton from "../../component/button";
import api from "../../services/apiService";
import { toast } from "react-toastify";
import { loginFields, loginButton } from "./loginConfig";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  // Redirect if already logged in
  useEffect(() => {
    if (!user?.role) return;

    if (user.role === "ADMIN" || user.role === "READ_ONLY") {
      navigate("/dashboard/users", { replace: true });
    } else {
      navigate("/dashboard/cost-explorer", { replace: true });
    }
  }, [user, navigate]);

  const validate = () => {
    const errors = {};

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const res = await api.post("/auth/login", data);

      const { token, role } = res.data;

      localStorage.setItem("token", token);

      dispatch(setUserData({ email: data.email, role }));

      toast.success("Login successful");

      if (role === "ADMIN" || role === "READ_ONLY") {
        navigate("/dashboard/users", { replace: true });
      } else {
        navigate("/dashboard/cost-explorer", { replace: true });
      }

    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-[2rem] w-full max-w-sm p-8 space-y-5"
      >
        <div className="flex justify-center">
          <img src={cloudLogo} alt="CloudBalance Logo" className="h-10" />
        </div>

        <h2 className="text-xl font-semibold text-center">
          Login to CloudBalance
        </h2>

        <FormRenderer
          fields={loginFields}
          data={data}
          onChange={handleChange}
          errors={error}
        />

        <CommonButton
          type={loginButton.type}
          text={loginButton.text}
        />
      </form>
    </div>
  );
};

export default Login;

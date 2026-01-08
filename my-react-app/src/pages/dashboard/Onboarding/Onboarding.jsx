import React, { useRef } from "react";
import Step_2 from "./steps/Step_2";
import Step_3 from "./steps/Step_3";
import { useState } from "react";
import { postApi } from "../../../services/apiService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import I_AM_Role from "./steps/I_AM_Role/I_AM_Role";
import { toast} from "react-toastify";
const Onboarding = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [account, setAccount] = useState({
    accountName: "",
    accountNumber: "",
    arnNumber: "",
  });
  const topRef = useRef(null);


  const validateForm = (formData) => {
    const { accountName, accountNumber, arnNumber } = formData;
    const arnRegex = /^arn:aws:iam::\d{12}:role\/[\w+=,.@-]+$/;
    const accountNumberRegex = /^\d{12}$/;
  
    if (
      !accountName.trim() || accountName.trim().length < 2 ||
      !accountNumberRegex.test(accountNumber.trim()) ||
      !arnRegex.test(arnNumber.trim())
    ) {
      return false;
    }
    return true;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    const updatedAccount = { ...account, [name]: value };
    setAccount(updatedAccount);
  
    // Validate form after every change
    setIsFormValid(validateForm(updatedAccount));
  };

  const [errors, setErrors] = useState({
    arnNumber: "",
  });


  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
  
    if (!value.trim()) {
      newErrors[name] = "This field is required.";
    } else {
      if (name === "arnNumber") {
        const arnRegex = /^arn:aws:iam::\d{12}:role\/[\w+=,.@-]+$/;
        if (!arnRegex.test(value.trim())) {
          newErrors[name] = "Invalid IAM Role ARN format.";
        } else {
          newErrors[name] = "";
        }
      }
      else if (name === "accountNumber") {
        const accountNumberRegex = /^\d{12}$/; // exactly 12 digits
        if (!accountNumberRegex.test(value.trim())) {
          newErrors[name] = "Account Number must be exactly 12 digits.";
        } else {
          newErrors[name] = "";
        }
      }
      else if (name === "accountName") {
        if (value.trim().length < 2) {
          newErrors[name] = "Account Name must be at least 2 characters.";
        } else {
          newErrors[name] = "";
        }
      }
      else {
        newErrors[name] = "";
      }
    }
  
    setErrors(newErrors);
  };


  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account.accountName || !account.accountNumber || !account.arnNumber) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await postApi("/accounts", account);
      console.log("Account saved successfully:", response.data);
      toast.success("Account saved successfully!");

      setAccount({
        accountName: "",
        accountNumber: "",
        arnNumber: "",
      });
      navigate("/dashboard/Onboarding/ThankYou", { replace: true });
    } catch (error) {
      console.error("Error saving account:", error);
      toast.error("Failed to save account.");
    }
  };

  

  const [step, setStep] = useState(1);


  const cancel = () => {
    setStep(1);
    setAccount({
      accountName: "",
      accountNumber: "",
      arnNumber: "",
    });
    setErrors({
      arnNumber: "",
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [step]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const steps = {
    1: (
      <I_AM_Role
        data={account}
        nextStep={nextStep}
        onChange={handleChange}
        onBlur={handleFieldBlur}
        errors={errors}
        setErrors={setErrors}
        isFormValid={isFormValid}
        cancel={cancel}
      />
    ),
    2: <Step_2 nextStep={nextStep} prevStep={prevStep} cancel={cancel}/>,
    3: <Step_3 onSubmit={handleSubmit} prevStep={prevStep} cancel={cancel}/>,
  };

  return <div ref={topRef}>{steps[step]}</div>;
};

export default Onboarding;

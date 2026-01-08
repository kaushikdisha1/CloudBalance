import React from "react";
import I_AM_Role_Config from "./I_AM_RoleConfig";
import CopyCodeBlock from "../../../../../component/CopyCodeBloack";
import FormRenderer from "../../../../../component/form/FormRender";
import CommonButton from "../../../../../component/button";

const I_AM_Role = ({ data, nextStep, onChange, onBlur, setErrors, errors, cancel, isFormValid }) => {
  const handleNextClick = () => {
    const { accountName, accountNumber, arnNumber } = data;
    const arnRegex = /^arn:aws:iam::\d{12}:role\/[\w+=,.@-]+$/;

    const newErrors = { arnNumber: "" };

    if (!accountName.trim() || !accountNumber.trim() || !arnNumber.trim()) {
      newErrors.arnNumber = "Please fill in all required fields.";
      setErrors(newErrors);
      return;
    }

    if (!arnRegex.test(arnNumber.trim())) {
      newErrors.arnNumber = "Invalid IAM Role ARN format.";
      setErrors(newErrors);
      return;
    }

    setErrors({ arnNumber: "" });
    nextStep();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 px-10 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Create an IAM Role
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        Create an IAM Role by following these steps
      </p>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <ol className="list-decimal pl-6 space-y-5 text-gray-800 text-sm">
          {I_AM_Role_Config.map((item, index) => {
            switch (item.type) {
              case "text":
                return (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></li>
                );

              case "policy":
                return (
                  <li key={index}>
                    <span dangerouslySetInnerHTML={{ __html: item.content }} />
                    <div className="mt-3">
                      <CopyCodeBlock
                        value={item.copyText}
                        copyPosition="right"
                      />
                    </div>
                  </li>
                );

              case "roleName":
                return (
                  <li key={index}>
                    <span dangerouslySetInnerHTML={{ __html: item.content }} />
                    <div className="mt-3 w-fit">
                      <CopyCodeBlock
                        value={item.copyText}
                        copyPosition={item.position || "right"}
                      />
                    </div>
                  </li>
                );

              case "image":
                return (
                  <li key={index}>
                    {item.content}
                    <img
                      src={item.img}
                      alt="Role ARN Screenshot"
                      className="mt-3 rounded border border-gray-300"
                    />
                  </li>
                );

              case "form":
                return (
                  <li key={index}>
                    <div
                      className="mb-2"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FormRenderer
                        fields={item.fields}
                        data={data}
                        onChange={onChange}
                        onBlur={onBlur}
                        errors={errors}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Paste the copied Role ARN from AWS Console.
                    </p>
                  </li>
                );

              default:
                return null;
            }
          })}
        </ol>
      </div>

      <div className="flex justify-between items-center mt-10">
        <CommonButton
          text="Cancel"
          variant="outlined"
          color="primary"
          onClick={cancel}
          fullWidth={false}
          className="px-6 py-2"
        />

        <CommonButton
          text="Next - Add Customer Managed Policies"
          onClick={handleNextClick}
          fullWidth={false}
          className="px-6 py-2"
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
};

export default I_AM_Role;

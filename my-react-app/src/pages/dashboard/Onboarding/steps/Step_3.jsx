import { Copy } from "lucide-react";
import React from "react";
import CopyCodeBlock from "../../../../component/CopyCodeBloack";
import img1 from "../../../../images/slide3_img1.png";
import img2 from "../../../../images/slide3_img2.png";
import img3 from "../../../../images/slide3_img3.png";

const Step_3 = ({onSubmit, prevStep, cancel}) => {
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-50 px-10 py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Create Cost & Usage Report
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Create a Cost & Usage Report by following these steps
        </p>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <ol className="list-decimal pl-6 space-y-5 text-gray-800 text-sm">
            <li>
              Go to{" "}
              <a href="#" className="text-blue-600 underline font-medium">
                Cost and Usage Reports
              </a>{" "}
              in the Billing Dashboard and click on Create report.
            </li>

            <li>
              Name the report as shown below and select the Include resource IDs
              checkbox -
              <div className="mt-3 w-fit">
                <CopyCodeBlock
                  value={"ck-tuner-275595855473-hourly-cur"}
                  copyPosition="left"
                />
              </div>
              Ensure that the following configuration is checked
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="accent-blue-500"
                />
                <span>Include Resource IDs</span>
              </label>
              Click on Next.
              <img src={img1} className="w-full" />
            </li>
            <li>
              In Configure S3 Bucket, provide the name of the S3 bucket that was
              created -
              <div>
                Ensure that the following configuration is checked
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="accent-blue-500"
                  />
                  <span>
                    The Follwing Default Policies will be applied ot your bucket
                  </span>
                </label>
              </div>
              Click On Save
              <img src={img2} className="w-full" />
            </li>

            <li>
              In the Delivery options section, enter the below-mentioned Report
              path prefix -
              <div className="mt-3 w-fit">
                Report path prefix
                <CopyCodeBlock
                  value={"ck-tuner-275595855473-hourly-cur"}
                  copyPosition="left"
                />
              </div>
              <div className="mt-6 text-sm text-gray-700">
                <p className="mb-2">
                  Additionally, ensure that the following checks are in place:
                </p>

                <div className="mb-4">
                  <p className="font-medium mb-1">Time granularity:</p>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked
                      disabled
                      className="accent-blue-600"
                    />
                    <span>Hourly</span>
                  </label>
                </div>

                <p className="mb-1">
                  Please make sure these checks are Enabled in
                  <span className="font-medium ml-1">
                    Enable report data integration for:
                  </span>
                </p>

                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="accent-blue-600"
                  />
                  <span className="font-medium">Amazon Athena</span>
                </label>
              </div>
              <img src={img3} className="w-full" />
            </li>
            <li>
              Click on Next. Now, review the configuration of the Cost and Usage
              Report. Once satisfied, click on Create Report.
            </li>
          </ol>
        </div>
        <div className="flex justify-between items-center mt-10">
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition" onClick={cancel}>
            Cancel
          </button>

          <div className="flex gap-4">
            <button
              onClick={prevStep}
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
            >
              Back - Attach I AM Policy
            </button>

            <button
              onClick={onSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Step_3;

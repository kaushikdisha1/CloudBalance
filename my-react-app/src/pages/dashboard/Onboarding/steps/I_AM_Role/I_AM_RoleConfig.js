import img1 from "../../../../../images/slide1_img1.png";

const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: {
        AWS: "arn:aws:iam::951485052809:root",
      },
      Action: "sts:AssumeRole",
      Condition: {
        StringEquals: {
          "sts:ExternalId":
            "Um9oaXRDS19ERUZBVUxUZDIzOTJkZTgtN2E0OS00NWQ3LTg3MzItODkyM2ExZTIzMjQw",
        },
      },
    },
    {
      Effect: "Allow",
      Principal: {
        Service: "s3.amazonaws.com",
      },
      Action: "sts:AssumeRole",
    },
  ],
};

const I_AM_Role_Config = [
  {
    type: "text",
    content:
      "Log into your AWS account and <a href='#' class='text-blue-600 underline font-medium'>create an IAM Role</a>.",
  },
  {
    type: "policy",
    content:
      "In the <strong>Trusted entity type</strong> section, select <strong>Custom trust policy</strong>. Replace the prefilled policy with the one below:",
    copyText: policy,
  },
  {
    type: "text",
    content:
      "Click on <strong>Next</strong> to go to the Add permissions page. We won't add any permissions now because the permission policy content depends on the AWS Account ID retrieved from the IAM Role.",
  },
  {
    type: "roleName",
    content:
      "In the <strong>Role name</strong> field, enter the below role name and click on <strong>Create Role</strong>:",
    copyText: "CK-Tuner-Role-dev2",
    position: "left",
  },
  {
    type: "image",
    content:
      "Go to the newly created IAM Role and copy the Role ARN:",
    img: img1,
  },
  {
    type: "form",
    content:
      "Enter the IAM Role ARN, Account Number and Name <span class='text-red-500'>*</span>",
    fields: [
      {
        name: "arnNumber",
        label: "IAM Role ARN",
        type: "text",
        required: true,
        placeholder: "arn:aws:iam::123456789012:role/CK-Tuner-Role-dev2",
        autoComplete: "off",
      },
      {
        name: "accountNumber",
        label: "Account Number",
        type: "text",
        required: true,
        placeholder: "Enter Account Number",
        autoComplete: "off",
      },
      {
        name: "accountName",
        label: "Account Name",
        type: "text",
        required: true,
        placeholder: "Enter Account Name",
        autoComplete: "off",
      },
    ],
  },
];

export default I_AM_Role_Config;

import React from "react";
import CopyCodeBlock from "../../../../component/CopyCodeBloack";
import img1 from "../../../../images/slide2_img1.png";
import img2 from "../../../../images/slide2_img2.png";
import img3 from "../../../../images/slide2_img3.png";
import img4 from "../../../../images/slide2_img4.png";

const Step_2 = ({ nextStep, prevStep, cancel }) => {
  const c1 = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "CostAudit",
        Effect: "Allow",
        Action: [
          "dms:Describe*",
          "dms:List*",
          "kafka:Describe*",
          "kafka:Get*",
          "kafka:List*",
          "mq:Describe*",
          "mq:List*",
          "route53resolver:Get*",
          "route53resolver:List*",
          "memorydb:Describe*",
          "savingsplans:Describe*",
          "cloudsearch:Describe*",
          "quicksight:Describe*",
          "quicksight:List*",
          "codepipeline:Get*",
          "codepipeline:List*",
          "codebuild:List*",
          "codebuild:Get*",
          "codebuild:Describe*",
          "codebuild:BatchGet*",
          "codedeploy:List*",
          "codedeploy:BatchGet*",
          "codedeploy:Get*",
          "mediaconnect:Describe*",
          "mediaconnect:List*",
          "mediaconvert:Describe*",
          "mediaconvert:Get*",
          "mediaconvert:List*",
          "medialive:Describe*",
          "medialive:List*",
          "mediapackage:Describe*",
          "mediapackage:List*",
          "mediapackage-vod:Describe*",
          "mediapackage-vod:List*",
          "mediastore:DescribeObject",
          "mediastore:Get*",
          "mediastore:List*",
          "mediatailor:Describe*",
          "mediatailor:Get*",
          "mediatailor:List*",
          "ec2:Describe*",
          "elasticache:Describe*",
          "events:DescribeEventBus",
          "events:List*",
          "elasticloadbalancing:Describe*",
          "kinesis:List*",
          "kinesis:Describe*",
          "kinesisanalytics:Describe*",
          "kinesisanalytics:List*",
          "dynamodb:Describe*",
          "dynamodb:List*",
          "cloudwatch:Describe*",
          "cloudwatch:List*",
          "cloudwatch:GetMetricStatistics",
          "ecr:GetLifecyclePolicy",
          "ecr:GetRepositoryPolicy",
          "ecr-public:DescribeRepositories",
          "ecr:List*",
          "ecr:Describe*",
          "lambda:List*",
          "lambda:GetPolicy",
          "lambda:GetAccountSettings",
          "lambda:GetFunctionConfiguration",
          "lambda:GetFunctionCodeSigningConfig",
          "lambda:GetFunctionConcurrency",
          "lambda:GetFunctionConfiguration",
          "rds:Describe*",
          "rds:ListTagsForResource",
          "sqs:GetQueueAttributes",
          "sqs:List*",
          "firehose:Describe*",
          "firehose:List*",
          "kafka:Describe*",
          "kafka:List*",
          "glue:GetDevEndpoint",
          "s3:GetBucketPolicy",
          "s3:List*",
          "network-firewall:Describe*",
          "network-firewall:List*",
          "elasticfilesystem:Describe*",
          "kms:Describe*",
          "kms:List*",
          "kms:GetKeyRotationStatus",
          "kms:GetKeyPolicy",
          "elasticmapreduce:List*",
          "es:Describe*",
          "es:List*",
          "es:Get*",
          "aoss:Get*",
          "aoss:List*",
          "logs:Describe*",
          "logs:List*",
          "application-autoscaling:Describe*",
          "route53:List*",
          "redshift:Describe*",
          "backup:Describe*",
          "backup:Get*",
          "backup:List*",
          "dlm:Get*",
          "dlm:List*",
          "sagemaker:List*",
          "lambda:Get*",
        ],
        Resource: "*",
      },
      {
        Sid: "BillingReadOnly",
        Effect: "Allow",
        Action: ["billingconductor:List*", "billing:ListBillingViews"],
        Resource: "*",
      },
      {
        Sid: "ComputeOptimizerReadAccess",
        Effect: "Allow",
        Action: ["compute-optimizer:Get*"],
        Resource: "*",
      },
      {
        Sid: "CostExplorerAccess",
        Effect: "Allow",
        Action: ["ce:Describe*", "ce:Get*", "ce:List*"],
        Resource: "*",
      },
      {
        Sid: "CURReportDefinitions",
        Effect: "Allow",
        Action: ["organizations:Describe*", "organizations:List*"],
        Resource: "*",
      },
      {
        Sid: "PricingAPIAccess",
        Effect: "Allow",
        Action: ["pricing:*"],
        Resource: "*",
      },
      {
        Sid: "WellArchitectedAccess",
        Effect: "Allow",
        Action: ["wellarchitected:*"],
        Resource: "*",
      },
      {
        Sid: "ReadOnlyForOrgServices",
        Effect: "Allow",
        Action: [
          "detective:Describe*",
          "detective:List*",
          "detective:Get*",
          "devops-guru:Describe*",
          "devops-guru:List*",
          "devops-guru:Get*",
          "devops-guru:Search*",
          "guardduty:Describe*",
          "guardduty:Get*",
          "guardduty:List*",
          "inspector:Describe*",
          "inspector:Get*",
          "inspector2:List*",
          "inspector2:Get*",
          "inspector2:Describe*",
          "macie2:Describe*",
          "macie2:Get*",
          "macie2:List*",
          "account:Get*",
          "account:ListRegions",
          "auditmanager:Get*",
          "auditmanager:List*",
          "controltower:Describe*",
          "controltower:Get*",
          "controltower:List*",
          "sso:Describe*",
          "sso:List*",
          "sso:Get*",
          "sso:Search*",
          "sso-directory:Describe*",
          "sso-directory:Get*",
          "sso-directory:List*",
          "sso-directory:Search*",
          "aws-marketplace:DescribeAgreement",
          "aws-marketplace:Get*",
          "aws-marketplace:List*",
          "aws-marketplace:ViewSubscriptions",
          "aws-marketplace:SearchAgreements",
          "networkmanager:DescribeGlobalNetworks",
          "networkmanager:Get*",
          "networkmanager:List*",
          "trustedadvisor:Describe*",
          "trustedadvisor:List*",
          "cloudtrail:Describe*",
          "cloudtrail:Get*",
          "cloudtrail:List*",
          "cloudtrail:LookupEvents",
          "cloudformation:Describe*",
          "cloudformation:Get*",
          "cloudformation:List*",
          "compute-optimizer:DescribeRecommendationExportJobs",
          "config:Describe*",
          "config:Get*",
          "config:List*",
          "ds:Describe*",
          "ds:Get*",
          "ds:List*",
          "fms:Get*",
          "fms:List*",
          "access-analyzer:Get*",
          "access-analyzer:List*",
          "healthlake:Describe*",
          "healthlake:GetCapabilities",
          "healthlake:List*",
          "healthlake:ReadResource",
          "healthlake:Search*",
          "health:Describe*",
          "license-manager:Get*",
          "license-manager:List*",
          "servicecatalog:Describe*",
          "servicecatalog:Get*",
          "servicecatalog:List*",
          "servicecatalog:ScanProvisionedProducts",
          "servicecatalog:Search*",
          "securityhub:Describe*",
          "securityhub:Get*",
          "securityhub:List*",
          "ssm:Describe*",
          "ssm:List*",
          "ram:Get*",
          "ram:List*",
          "servicequotas:Get*",
          "servicequotas:List*",
          "s3:Describe*",
          "license-manager:GetGrant",
          "license-manager:ListTokens",
          "license-manager-user-subscriptions:List*",
        ],
        Resource: "*",
      },
    ],
  };

  const c2 = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "SecAudit",
        Effect: "Allow",
        Action: [
          "cloudfront:List*",
          "cloudfront:Get*",
          "cloudfront:Describe*",
          "ecr:DescribeRepositories",
          "ecr:BatchGetRepositoryScanningConfiguration",
          "iam:List*",
          "iam:Get*",
          "lambda:GetFunctionConfiguration",
          "lambda:GetFunctionUrlConfig",
          "cloudwatch:GetMetricStatistics",
          "ec2:DescribeInstances",
          "ec2:DescribeVpcs",
          "ec2:DescribeSecurityGroups",
          "ec2:DescribeNetworkInterfaces",
          "redshift:DescribeClusters",
          "inspector2:BatchGetAccountStatus",
          "ec2:DescribeFlowLogs",
          "securityhub:GetEnabledStandards",
          "s3:ListAllMyBuckets",
          "s3:GetBucketLogging",
          "s3:GetEncryptionConfiguration",
          "s3:GetBucketPolicyStatus",
          "s3:GetBucketAcl",
          "s3:GetBucketVersioning",
          "s3:GetAccountPublicAccessBlock",
          "s3:GetBucketCORS",
          "s3:GetBucketPolicy",
          "s3:GetBucketVersioning",
          "s3:GetEncryptionConfiguration",
          "s3:GetLifecycleConfiguration",
          "sts:GetCallerIdentity",
          "wafv2:List*",
          "wafv2:Get*",
        ],
        Resource: "*",
      },
      {
        Sid: "SecAuditServiceQuotas",
        Effect: "Allow",
        Action: [
          "states:ListStateMachines",
          "servicequotas:GetServiceQuota",
          "acm:List*",
          "acm:DescribeCertificate",
          "athena:ListWorkGroups",
          "athena:GetWorkGroup",
          "apigateway:GET",
          "autoscaling:Describe*",
          "cloudformation:DescribeAccountLimits",
          "cloudformation:DescribeStacks",
          "cloudwatch:GetMetricData",
          "ds:GetDirectoryLimits",
          "ec2:Describe*",
          "ec2:GetEbsDefaultKmsKeyId",
          "ec2:GetEbsEncryptionByDefault",
          "ecs:Describe*",
          "ecs:List*",
          "eks:Describe*",
          "eks:List*",
          "elasticache:DescribeCacheClusters",
          "elasticache:DescribeCacheParameterGroups",
          "elasticache:DescribeCacheSecurityGroups",
          "elasticache:DescribeCacheSubnetGroups",
          "elasticbeanstalk:DescribeApplicationVersions",
          "elasticbeanstalk:DescribeApplications",
          "elasticbeanstalk:DescribeEnvironments",
          "elasticfilesystem:DescribeFileSystems",
          "firehose:ListDeliveryStreams",
          "lambda:GetAccountSettings",
          "redshift:DescribeClusterSnapshots",
          "redshift:DescribeClusterSubnetGroups",
          "route53:GetHostedZone",
          "route53:GetHostedZoneLimit",
          "route53:ListHostedZones",
          "servicequotas:List*",
          "servicequotas:Get*",
          "ses:Get*",
          "ses:List*",
          "support:Describe*",
          "support:SearchForCases",
          "trustedadvisor:Describe*",
          "trustedadvisor:GenerateReport",
          "trustedadvisor:RefreshCheck",
          "iam:GenerateCredentialReport",
          "iam:GetCredentialReport",
          "secretsmanager:ListSecrets",
          "secretsmanager:DescribeSecret",
          "sns:List*",
          "sns:Get*",
          "artifact:ListReports",
          "artifact:GetReportMetadata",
          "artifact:GetReport",
          "artifact:GetTermForReport",
        ],
        Resource: "*",
      },
      {
        Sid: "NewReadAccountBillingPermissions",
        Effect: "Allow",
        Action: [
          "consolidatedbilling:GetAccountBillingRole",
          "consolidatedbilling:ListLinkedAccounts",
          "billing:Get*",
          "payments:ListPaymentPreferences",
          "invoicing:GetInvoicePDF",
          "invoicing:ListInvoiceSummaries",
        ],
        Resource: "*",
      },
    ],
  };
  const c3 = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "CostExplorer",
        Action: [
          "ce:StartSavingsPlansPurchaseRecommendationGeneration",
          "ce:UpdatePreferences",
        ],
        Effect: "Allow",
        Resource: "*",
      },
      {
        Sid: "ListEC2SPReservations",
        Effect: "Allow",
        Action: [
          "ec2:DescribeCapacityReservations",
          "ec2:DescribeCapacityReservationFleets",
          "ec2:GetCapacityReservationUsage",
          "ec2:GetGroupsForCapacityReservation",
          "ec2:DescribeHostReservations",
          "ec2:DescribeHostReservationOfferings",
          "ec2:GetHostReservationPurchasePreview",
          "ec2:DescribeReservedInstancesOfferings",
          "ec2:DescribeReservedInstancesModifications",
          "ec2:DescribeReservedInstances",
          "ec2:GetReservedInstancesExchangeQuote",
          "ec2:DescribeReservedInstancesListings",
        ],
        Resource: "*",
      },
      {
        Sid: "ComputeOptimizerAccess",
        Effect: "Allow",
        Action: [
          "compute-optimizer:UpdateEnrollmentStatus",
          "compute-optimizer:PutRecommendationPreferences",
        ],
        Resource: "*",
      },
      {
        Sid: "ServiceLinkedRole",
        Effect: "Allow",
        Action: "iam:CreateServiceLinkedRole",
        Resource:
          "arn:aws:iam::*:role/aws-service-role/compute-optimizer.amazonaws.com/AWSServiceRoleForComputeOptimizer*",
        Condition: {
          StringLike: {
            "iam:AWSServiceName": "compute-optimizer.amazonaws.com",
          },
        },
      },
      {
        Sid: "ServiceLinkedRolePolicy",
        Effect: "Allow",
        Action: "iam:PutRolePolicy",
        Resource:
          "arn:aws:iam::*:role/aws-service-role/compute-optimizer.amazonaws.com/AWSServiceRoleForComputeOptimizer",
      },
      {
        Sid: "AllowRoleToInspectItself",
        Effect: "Allow",
        Action: ["iam:ListRolePolicies", "iam:GetRolePolicy"],
        Resource: "arn:aws:iam::275595855473:role/CK-Tuner-Role-dev2",
      },
    ],
  };

  const c4 = {
    Version: "2012-10-17",
    Statement: [
      {
        Action: [
          "cur:ValidateReportDestination",
          "cur:DescribeReportDefinitions",
        ],
        Resource: ["*"],
        Effect: "Allow",
        Sid: "ReadCostAndUsageReport",
      },
      {
        Action: [
          "s3:ListBucket",
          "s3:GetReplicationConfiguration",
          "s3:GetObjectVersionForReplication",
          "s3:GetObjectVersionAcl",
          "s3:GetObjectVersionTagging",
          "s3:GetObjectRetention",
          "s3:GetObjectLegalHold",
          "s3:GetObject",
        ],
        Resource: [
          "arn:aws:s3:::ck-tuner-275595855473",
          "arn:aws:s3:::ck-tuner-275595855473/*",
        ],
        Effect: "Allow",
        Sid: "S3LimitedRead",
      },
      {
        Action: [
          "s3:GetObjectVersionTagging",
          "s3:GetBucketVersioning",
          "s3:ReplicateObject",
          "s3:ReplicateDelete",
          "s3:ReplicateTags",
          "s3:ObjectOwnerOverrideToBucketOwner",
        ],
        Resource: [
          "arn:aws:s3:::ck-tuner-cur-dev2-1000291",
          "arn:aws:s3:::ck-tuner-cur-dev2-1000291/*",
        ],
        Effect: "Allow",
        Sid: "S3Replicate",
      },
      {
        Action: ["s3:PutObject", "s3:GetObject"],
        Resource: "arn:aws:s3:::ck-tuner-275595855473/CKTunerTestFile",
        Effect: "Allow",
        Sid: "S3ReplicationCheck",
      },
    ],
  };
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50 px-10 py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Add Customer Managed Policies
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Create an IAM Role by following these steps
        </p>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <ol className="list-decimal pl-6 space-y-5 text-gray-800 text-sm">
            <li>
              Go to the{" "}
              <a href="#" className="text-blue-600 underline font-medium">
                Create Policy
              </a>{" "}
              Page
            </li>

            <li>
              Click on the JSON tab and paste the following policy and click on
              Next:
              <div className="mt-3">
                <CopyCodeBlock value={c1} copyPosition="right" />
              </div>
            </li>

            <li>
              In the Name field, enter below-mentioned policy name and click on
              Create Policy
              <div className="mt-3 w-fit">
                <CopyCodeBlock
                  copyPosition="left"
                  value={"cktuner-CostAuditPolicy"}
                />
              </div>
            </li>

            <li>
              Again, go to the{" "}
              <a href="#" className="text-blue-600 underline font-medium">
                Create Policy
              </a>{" "}
              Page.
            </li>

            <li>
              Click on the JSON tab and paste the following policy and click on
              Next:
              <div className="mt-3">
                <CopyCodeBlock value={c2} copyPosition="right" />
              </div>
            </li>

            <li>
              In the Name field, enter below-mentioned policy name and click on
              Create Policy
              <div className="mt-3 w-fit">
                <CopyCodeBlock
                  copyPosition="left"
                  value={"cktuner-SecAuditPolicy"}
                />
              </div>
            </li>

            <li>
              Again, go to the{" "}
              <a href="#" className="text-blue-600 underline font-medium">
                Create Policy
              </a>{" "}
              Page.
            </li>

            <li>
              Click on the JSON tab and paste the following policy and click on
              Next:
              <div className="mt-3">
                <CopyCodeBlock value={c3} copyPosition="right" />
              </div>
            </li>

            <li>
              In the Name field, enter below-mentioned policy name and click on
              Create Policy
              <div className="mt-3 w-fit">
                <CopyCodeBlock
                  copyPosition="left"
                  value={"cktuner-TunerReadEssentials"}
                />
              </div>
            </li>

            <li>
              Go to the <a>CK-Tuner-Role</a>
              <img src={img1}></img>
            </li>

            <li>
              In Permission policies, click on Add permissions `{">"}` Attach
              Policy
              <img src={img2}></img>
            </li>
            <li>
              Filter by Type `{">"}` Customer managed then search for
              cktuner-CostAuditPolicy, cktuner-SecAuditPolicy,
              cktuner-TunerReadEssentials and select them.
              <img src={img3}></img>
            </li>
            <li>Now, click on Add permissions</li>
            <li>
              In Permission policies, click on Add permissions `{">"}` Create
              inline policy
              <img src={img4}></img>
            </li>
            <li>
              Click on the JSON tab and paste the following policy
              <div className="mt-3">
                <CopyCodeBlock value={c4} copyPosition="right" />
              </div>
            </li>

            <li>Now, click on Review policy</li>

            <li>
              In the Name field, enter the below-mentioned policy name and click
              on Create Policy
              <div className="mt-3 w-fit">
                <CopyCodeBlock
                  copyPosition="left"
                  value={"S3CrossAccountReplication"}
                />
              </div>
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
              Back - Create an I AM Role
            </button>

            <button
              onClick={nextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Next - Create CUR
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step_2;

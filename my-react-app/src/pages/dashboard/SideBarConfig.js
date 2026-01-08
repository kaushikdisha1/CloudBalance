import { FaUsers, FaUserPlus, FaChartLine, FaServer } from "react-icons/fa";

const adminCon = [
  {
    text: "User Management",
    path: "users",
    allowedRoles: ["ADMIN", "READ_ONLY"],
    icon: FaUsers, // ✅ function reference
  },
  {
    text: "Onboarding",
    path: "onboarding",
    allowedRoles: ["ADMIN"],
    icon: FaUserPlus,
  },
  {
    text: "Cost Explorer",
    path: "cost-explorer",
    allowedRoles: ["ADMIN", "CUSTOMER", "READ_ONLY"],
    icon: FaChartLine,
  },
  {
    text: "AWS Services",
    path: "aws-services",
    allowedRoles: ["ADMIN", "CUSTOMER", "READ_ONLY"],
    icon: FaServer,
  },
];

export { adminCon };

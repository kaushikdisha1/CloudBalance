const services = [
    { serviceName: "EC2", serviceType: "ec2" },
    { serviceName: "RDS", serviceType: "rds" },
    { serviceName: "ASG", serviceType: "asg" },
  ];

export const ec2TableColumns = [
    {field : "resourceId", headerName : "Resource ID", flex : 1},
    {field : "resourceName", headerName : "Resource Name", flex : 1},
    {field : "region", headerName : "Region", flex : 1},
    {field : "status", headerName : "Status", flex : 1},
] 

export const rdsTableColumns = [
    {field : "resourceId", headerName : "Resource ID", flex : 1},
    {field : "resourceName", headerName : "Resource Name", flex : 1},
    {field : "engine", headerName : "Engine", flex : 1},
    {field : "region", headerName : "Region", flex : 1},
    {field : "status", headerName : "Status", flex : 1},
]

export const asgTableColumns = [
    {field : "resourceId", headerName : "Resource ID", flex : 1},
    {field : "resourceName", headerName : "Resource Name", flex : 1},
    {field : "region", headerName : "Region", flex : 1},
    {field : "desiredCapacity", headerName : "Desired Capacity", flex : 1},
    {field : "minSize", headerName : "Min Size", flex : 1},
    {field : "maxSize", headerName : "Max Size", flex : 1},
    {field : "status", headerName : "Status", flex : 1},
]
  
export default services;
  
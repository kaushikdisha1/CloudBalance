import React, { useState } from "react";
import useLogoutUser from "../assets/logout";
import img from "../images/image1.png";
import { useSelector } from "react-redux";
import CommonButton from "./button";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const Header = ({ toggleSidebar }) => {
  const logout = useLogoutUser();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user) || {};

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogoClick = () => {
    if (user?.role === "ADMIN" || user?.role === "READ_ONLY") {
      navigate("/dashboard/users");
    } else if (user?.role === "CUSTOMER") {
      navigate("/dashboard/cost-explorer");
    }
  };

  const getDisplayName = () => {
    if (!user.role) return "Guest";
    if (user.role === "ADMIN") return "Admin";
    if (user.role === "CUSTOMER") return user.firstName || "Customer";
    return "Guest";
  };

  return (
    <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center w-3000 gap-3">
        <img
          src={img}
          alt="Logo"
          onClick={handleLogoClick}
          className="h-9 w-35 cursor-pointer"
        />

        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-blue-500 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* ✅ User Avatar */}
        <Avatar
          src={user.profileImage || ""}
          sx={{ width: 32, height: 32 }}
        >
          {!user.profileImage && getDisplayName()[0]}
        </Avatar>

        {/* Welcome Text */}
        <div className="text-sm text-gray-700">
          Welcome, <span className="font-medium">{getDisplayName()}</span>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Logout Button */}
        <CommonButton
          text="Logout"
          onClick={() => setOpenLogoutDialog(true)}
          color="error"
          variant="contained"
          fullWidth={false}
          className="text-sm px-4 py-1"
        />
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
      >
        <DialogTitle>
          <Typography variant="h6">Confirm Logout</Typography>
        </DialogTitle>
        <Box sx={{ px: 3 }}>
          <Typography>Are you sure you want to logout?</Typography>
        </Box>
        <DialogActions>
          <Button onClick={() => setOpenLogoutDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              logout();
              setOpenLogoutDialog(false);
            }}
            color="error"
            variant="contained"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;

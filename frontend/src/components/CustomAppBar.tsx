"use client";
import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useUserAuth } from "./AuthProvider";
export default function CustomAppBar() {
  const auth = useUserAuth();
  return (
    <AppBar position="fixed" sx={{ zIndex: 2000,}}>
      <Toolbar sx={{ background:"#171819"  }}>
        <DashboardIcon
          sx={{ color: "#444", mr: 2, transform: "translateY(-2px)" }}
        />
        <Typography variant="h6" noWrap component="div">
          Analytics Dashboard
        </Typography>
        {auth?.user?.token && (
          <PowerSettingsNewIcon
            onClick={() => {
              auth?.logOut();
            }}
            sx={{  ml: "auto", cursor: "pointer" }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}

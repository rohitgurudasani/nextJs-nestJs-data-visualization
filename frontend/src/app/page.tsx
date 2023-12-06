"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useCallback, useEffect, useState } from "react";
import { useUserAuth } from "@/components/AuthProvider";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { DataContext, IData, IFilter } from "@/app.constants";
import { GridItem } from "@/components/Dashboard/GridItem";

export default function Home() {
  const auth = useUserAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IData>({} as IData);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [filter, setFilter] = useState<IFilter>({
    genderData: { type: "bar", xDataKey: "_id", yDataKey: "avgMathScore" },
    raceData: { type: "area", xDataKey: "_id", yDataKey: "avgMathScore" },
    parentEducationData: {
      type: "line",
      xDataKey: "_id",
      yDataKey: "avgMathScore",
    },
    lunchData: { type: "pie", xDataKey: "_id", yDataKey: "avgMathScore" },
    testPrepData: { type: "bar", xDataKey: "_id", yDataKey: "avgMathScore" },
  });
  const [md, setMd] = useState(6);
  const [chartColor, setChartColor] = useState("#82ca9d");

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const dataRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chart/all`,
        {
          headers: { Authorization: `Bearer ${auth?.user?.token}` },
        }
      );
      console.log("dataRes", dataRes);

      if (dataRes?.data) {
        setData(dataRes.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [auth?.user?.token]);

  useEffect(() => {
    if (auth?.user?.token) {
      getData();
    }
  }, [auth?.user?.token]);

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Box
          sx={{
            background: "#171819",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DataContext.Provider value={{ filter, data, setFilter, md, chartColor }}>
        <Box
          sx={{
            background: "#171819",
            minHeight: "90vh",
            p: "0px 20px 20px 20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: "20px",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: "10px" }}>
              <input
                type="color"
                id="head"
                name="head"
                value={chartColor}
                onChange={(e) => {
                  setChartColor(e.target.value);
                }}
              />
            </Box>

            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {md == 6 ? (
                <DensityMediumIcon sx={{ mr: "4px" }} />
              ) : (
                <FormatAlignJustifyIcon sx={{ mr: "4px" }} />
              )}
              Density
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                selected={md === 4}
                onClick={() => {
                  setMd(4);
                  handleClose();
                }}
              >
                <FormatAlignJustifyIcon sx={{ mr: "4px" }} />
                Compact
              </MenuItem>
              <MenuItem
                selected={md === 6}
                onClick={() => {
                  setMd(6);
                  handleClose();
                }}
              >
                <DensityMediumIcon sx={{ mr: "4px" }} />
                Standard
              </MenuItem>
            </Menu>
          </Box>
          <Grid container spacing={2}>
            <GridItem title="Gender Chart" dataKey="genderData" />
            <GridItem title="Lunch Chart" dataKey="lunchData" />
            <GridItem
              title="Parent Education Chart"
              dataKey="parentEducationData"
            />
            <GridItem title="Race/Ethnicity Chart" dataKey="raceData" />
            <GridItem title="Test Preparation Chart" dataKey="testPrepData" />
          </Grid>
        </Box>
      </DataContext.Provider>
    </ProtectedRoute>
  );
}

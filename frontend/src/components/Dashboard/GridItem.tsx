"use client";
import React, { useCallback, useContext } from "react";
import {
  Box,
  Grid,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  Typography,
  Tooltip as MuiTooltip,
  Checkbox,
  ListItemText,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { DataContext, IDataProp, IFilter } from "@/app.constants";
import { ChartBlock } from "./ChartBlock";

interface IGridItem {
  title: string;
  dataKey: keyof IFilter;
}

const gridItemStyle: SxProps<Theme> = {
  background: "#212124",
  border: "1px solid #141414",
  p: "10px",
};

const mapChartKey = {
  genderData: "gender type",
  raceData: "race/ethnicity type",
  parentEducationData: "parent education type",
  lunchData: "lunch type",
  testPrepData: "test prep status",
};

export const GridItem = ({ title, dataKey }: IGridItem) => {
  const chartData = useContext(DataContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selChartanchorEl, setSelChartAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const openChart = Boolean(selChartanchorEl);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleCloseGraphModal = useCallback(() => {
    setSelChartAnchorEl(null);
  }, []);

  const handleOnchangeXDataKey = (key: keyof IDataProp) => () => {
    chartData?.setFilter({
      ...chartData?.filter,
      [dataKey]: {
        ...chartData?.filter[dataKey],
        xDataKey: key,
      },
    });
  };

  const handleOnchangeYDataKey = (key: keyof IDataProp) => () => {
    chartData?.setFilter({
      ...chartData?.filter,
      [dataKey]: {
        ...chartData?.filter[dataKey],
        yDataKey: key,
      },
    });
  };

  const handleOnchangeChart = (type: string) => () => {
    chartData?.setFilter({
      ...chartData?.filter,
      [dataKey]: {
        ...chartData?.filter[dataKey],
        type: type,
      },
    });
    handleCloseGraphModal();
  };

  return (
    <Grid item sm={6} xs={12} md={chartData?.md}>
      <Box sx={gridItemStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: "20px",
            mt: "4px",
          }}
        >
          <Box />
          <Typography sx={{ textAlign: "center" }}>{title}</Typography>
          <Box>
            <MuiTooltip title="Auto Graph">
              <AutoGraphIcon
                sx={{ cursor: "pointer", mr: "14px" }}
                id="graph-btn"
                aria-controls={openChart ? "graph-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openChart ? "true" : undefined}
                onClick={(e: any) => {
                  setSelChartAnchorEl(e.currentTarget);
                }}
              />
            </MuiTooltip>
            <Menu
              id="graph-menu"
              anchorEl={selChartanchorEl}
              open={openChart}
              onClose={handleCloseGraphModal}
              MenuListProps={{
                "aria-labelledby": "graph-btn",
              }}
            >
              <MenuItem
                selected={chartData?.filter[dataKey].type == "bar"}
                onClick={handleOnchangeChart("bar")}
              >
                Bar Chart
              </MenuItem>
              <MenuItem
                selected={chartData?.filter[dataKey].type == "line"}
                onClick={handleOnchangeChart("line")}
              >
                Line Chart
              </MenuItem>
              <MenuItem
                selected={chartData?.filter[dataKey].type == "area"}
                onClick={handleOnchangeChart("area")}
              >
                Area Chart
              </MenuItem>
              <MenuItem
                selected={chartData?.filter[dataKey].type == "pie"}
                onClick={handleOnchangeChart("pie")}
              >
                Pie Chart
              </MenuItem>
            </Menu>
            <MuiTooltip title="Filters">
              <FilterListIcon
                sx={{ cursor: "pointer", mr: "10px" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(e: any) => {
                  setAnchorEl(e.currentTarget);
                }}
              />
            </MuiTooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Typography sx={{ ml: "20px" }}>X-Axis</Typography>

              <MenuItem onClick={handleOnchangeXDataKey("_id")}>
                <Checkbox
                  sx={{ p: 0, mr: "8px" }}
                  checked={chartData?.filter?.[dataKey]?.xDataKey == "_id"}
                />
                <ListItemText primary={mapChartKey[dataKey]} />
              </MenuItem>
              <MenuItem onClick={handleOnchangeXDataKey("avgMathScore")}>
                <Checkbox
                  sx={{ p: 0, mr: "8px" }}
                  checked={
                    chartData?.filter?.[dataKey]?.xDataKey == "avgMathScore"
                  }
                />
                <ListItemText primary={"avgMathScore"} />
              </MenuItem>
              <MenuItem onClick={handleOnchangeXDataKey("avgReadingScore")}>
                <Checkbox
                  sx={{ p: 0, mr: "8px" }}
                  checked={
                    chartData?.filter?.[dataKey]?.xDataKey == "avgReadingScore"
                  }
                />
                <ListItemText primary={"avgReadingScore"} />
              </MenuItem>
              <MenuItem onClick={handleOnchangeXDataKey("avgWritingScore")}>
                <Checkbox
                  sx={{ p: 0, mr: "8px" }}
                  checked={
                    chartData?.filter?.[dataKey]?.xDataKey == "avgWritingScore"
                  }
                />
                <ListItemText primary={"avgWritingScore"} />
              </MenuItem>

              <Typography sx={{ ml: "20px", mt: "10px" }}>Y-Axis</Typography>

              <MenuItem onClick={handleOnchangeYDataKey("avgMathScore")}>
                <Checkbox
                  sx={{ p: 0, mr: "8px" }}
                  checked={
                    chartData?.filter?.[dataKey]?.yDataKey == "avgMathScore"
                  }
                />
                <ListItemText primary={"avgMathScore"} />
              </MenuItem>
              <MenuItem onClick={handleOnchangeYDataKey("avgReadingScore")}>
                <Checkbox
                  sx={{ p: 0, mr: "8px" }}
                  checked={
                    chartData?.filter?.[dataKey]?.yDataKey == "avgReadingScore"
                  }
                />
                <ListItemText primary={"avgReadingScore"} />
              </MenuItem>
              <MenuItem onClick={handleOnchangeYDataKey("avgWritingScore")}>
                <Checkbox
                  sx={{ p: 0, mr: "8px" }}
                  checked={
                    chartData?.filter?.[dataKey]?.yDataKey == "avgWritingScore"
                  }
                />
                <ListItemText primary={"avgWritingScore"} />
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <ChartBlock dataKey={dataKey} />
      </Box>
    </Grid>
  );
};

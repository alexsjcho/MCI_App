"use client";

import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#7C2FE0",
      light: "rgba(124, 47, 224, 0.08)",
      dark: "#6D28D9",
    },
    secondary: {
      main: "#0EA5E9",
    },
    background: {
      default: "#FAFAFE",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1525",
      secondary: "#5E566E",
      disabled: "#8A839A",
    },
    success: { main: "#178755" },
    warning: { main: "#B07A18" },
    error: { main: "#CC0404" },
    info: { main: "#0878A8" },
  },
  typography: {
    fontFamily: "var(--font-inter), 'Inter', -apple-system, sans-serif",
    h1: {
      fontSize: "1.75rem",
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.875rem",
      color: "#5E566E",
    },
    body2: {
      fontSize: "0.8125rem",
      color: "#8A839A",
    },
    caption: {
      fontSize: "0.6875rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      color: "#8A839A",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
        outlined: {
          borderColor: "rgba(109, 40, 217, 0.12)",
          "&:hover": {
            borderColor: "#7C2FE0",
            backgroundColor: "rgba(109, 40, 217, 0.04)",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.8125rem",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#7C2FE0",
          height: 2,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "100px",
          fontSize: "0.625rem",
          fontWeight: 600,
          letterSpacing: "0.3px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 10,
          border: "1px solid rgba(109, 40, 217, 0.12)",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "#5E566E",
            backgroundColor: "#FFFFFF",
            padding: "12px 14px",
          },
          "& .MuiTableCell-body": {
            fontSize: "0.8125rem",
            padding: "10px 14px",
            verticalAlign: "top",
          },
        },
      },
    },
  },
});

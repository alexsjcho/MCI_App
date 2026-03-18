import { createTheme } from "@mui/material/styles";

// Brand colour tokens
export const tokens = {
  bg: "#f4f3ff",
  surface: "#ffffff",
  surface2: "#f0eff8",
  surface3: "#e5e3f5",
  border: "rgba(100,90,200,0.10)",
  border2: "rgba(100,90,200,0.20)",
  text: "#1a1730",
  text2: "#4b4670",
  text3: "#8f8bb0",
  wisdom: "#5b4de8",
  wisdomDim: "rgba(91,77,232,0.08)",
  danger: "#d94f46",
  success: "#17a86e",
  warn: "#d4820a",
  gridColor: "rgba(100,90,200,0.08)",
} as const;

// Badge colour maps
export const badgeStyles = {
  enterprise: { bg: "rgba(37,99,235,0.08)", color: "#1d4ed8", border: "rgba(37,99,235,0.18)" },
  mid: { bg: "rgba(180,83,9,0.08)", color: "#92400e", border: "rgba(180,83,9,0.18)" },
  smb: { bg: "rgba(6,95,70,0.08)", color: "#065f46", border: "rgba(6,95,70,0.18)" },
  ai: { bg: "rgba(91,77,232,0.10)", color: "#4338ca", border: "rgba(91,77,232,0.22)" },
} as const;

// Chart.js shared tooltip style
export const chartTooltip = {
  backgroundColor: "#fff",
  titleColor: tokens.text,
  bodyColor: tokens.text2,
  borderColor: "rgba(100,90,200,0.15)",
  borderWidth: 1,
};

// MUI theme
export const theme = createTheme({
  palette: {
    background: { default: tokens.bg, paper: tokens.surface },
    primary: { main: tokens.wisdom },
    error: { main: tokens.danger },
    success: { main: tokens.success },
    warning: { main: tokens.warn },
    text: {
      primary: tokens.text,
      secondary: tokens.text2,
      disabled: tokens.text3,
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", sans-serif',
    h1: { fontFamily: '"Syne", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { background: tokens.bg },
        "*::-webkit-scrollbar": { width: 5, height: 5 },
        "*::-webkit-scrollbar-track": { background: "transparent" },
        "*::-webkit-scrollbar-thumb": { background: tokens.surface3, borderRadius: 3 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `1px solid ${tokens.border}`,
          borderRadius: 16,
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "none", fontFamily: '"Inter", sans-serif' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: '"Inter", sans-serif' },
      },
    },
  },
});

"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NextLink from "next/link";

const EXPANDED_NAV_WIDTH = 220;
const COLLAPSED_NAV_WIDTH = 72;
const COLLAPSED_PILL_SIZE = 44;
const EXPANDED_PILL_WIDTH = 188;

function NavCollapseIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="4" x2="11" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <polyline
        points="9 9 7 12 9 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function NavExpandIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="13" y1="4" x2="13" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <polyline
        points="15 9 17 12 15 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="7.5" y="8" width="2.5" height="2" rx="0.5" />
      <rect x="7.5" y="11" width="2.5" height="2" rx="0.5" />
      <rect x="7.5" y="14" width="2.5" height="2" rx="0.5" />
    </SvgIcon>
  );
}

type ProductMarketingNavProps = {
  active: "qualify" | "company" | "features" | "use-cases";
};

export function ProductMarketingNav({ active }: ProductMarketingNavProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <Box
      component="nav"
      aria-label="Primary navigation"
      sx={{
        width: isNavCollapsed ? COLLAPSED_NAV_WIDTH : EXPANDED_NAV_WIDTH,
        borderRight: 1,
        borderColor: "divider",
        px: isNavCollapsed ? 1 : 2,
        py: 3,
        display: { xs: "none", md: "block" },
        position: "sticky",
        top: 0,
        height: "100vh",
        bgcolor: "background.paper",
        zIndex: 110,
      }}
    >
      <IconButton
        size="small"
        aria-label={isNavCollapsed ? "Expand navigation" : "Collapse navigation"}
        onClick={() => setIsNavCollapsed((prev) => !prev)}
        sx={{
          mb: isNavCollapsed ? 1.5 : 2,
          borderRadius: 1,
          border: 1,
          borderColor: "divider",
        }}
      >
        {isNavCollapsed ? (
          <NavExpandIcon fontSize="small" />
        ) : (
          <NavCollapseIcon fontSize="small" />
        )}
      </IconButton>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "stretch",
        }}
      >
        {!isNavCollapsed && (
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{
              mb: 0.5,
              display: "block",
              letterSpacing: 0.8,
              whiteSpace: "nowrap",
            }}
          >
            Product Marketing
          </Typography>
        )}

        <Button
          variant="text"
          fullWidth
          component={NextLink}
          href="/qualify"
          sx={{
            justifyContent: isNavCollapsed ? "center" : "flex-start",
            minWidth: 0,
            px: isNavCollapsed ? 0 : 2,
            width: isNavCollapsed ? COLLAPSED_PILL_SIZE : EXPANDED_PILL_WIDTH,
            height: isNavCollapsed ? COLLAPSED_PILL_SIZE : "auto",
            alignSelf: "center",
            textTransform: "none",
            fontSize: "0.8125rem",
            fontWeight: 600,
            borderRadius: 999,
            bgcolor:
              active === "qualify" ? "primary.main" : "rgba(124,58,237,0.04)",
            color: active === "qualify" ? "#fff" : "primary.main",
            "&:hover": {
              bgcolor:
                active === "qualify"
                  ? "primary.main"
                  : "rgba(124,58,237,0.08)",
            },
          }}
        >
          {isNavCollapsed ? (
            <HowToRegIcon
              fontSize="small"
              data-testid="qualify-icon"
            />
          ) : (
            <>
              <HowToRegIcon
                fontSize="small"
                data-testid="qualify-icon"
                style={{ marginRight: 8 }}
              />
              Qualify
            </>
          )}
        </Button>

        <Button
          variant="text"
          fullWidth
          component={NextLink}
          href="/company"
          sx={{
            justifyContent: isNavCollapsed ? "center" : "flex-start",
            minWidth: 0,
            px: isNavCollapsed ? 0 : 2,
            width: isNavCollapsed ? COLLAPSED_PILL_SIZE : EXPANDED_PILL_WIDTH,
            height: isNavCollapsed ? COLLAPSED_PILL_SIZE : "auto",
            alignSelf: "center",
            textTransform: "none",
            fontSize: "0.8125rem",
            fontWeight: 600,
            borderRadius: 999,
            bgcolor:
              active === "company" ? "primary.main" : "rgba(124,58,237,0.04)",
            color: active === "company" ? "#fff" : "primary.main",
            "&:hover": {
              bgcolor:
                active === "company"
                  ? "primary.main"
                  : "rgba(124,58,237,0.08)",
            },
          }}
        >
          {isNavCollapsed ? (
            <ApartmentIcon
              fontSize="small"
              data-testid="company-icon"
            />
          ) : (
            <>
              <ApartmentIcon
                fontSize="small"
                data-testid="company-icon"
                style={{ marginRight: 8 }}
              />
              Competitor
            </>
          )}
        </Button>

        <Button
          variant="text"
          fullWidth
          component={NextLink}
          href="/"
          sx={{
            justifyContent: isNavCollapsed ? "center" : "flex-start",
            minWidth: 0,
            px: isNavCollapsed ? 0 : 2,
            width: isNavCollapsed ? COLLAPSED_PILL_SIZE : EXPANDED_PILL_WIDTH,
            height: isNavCollapsed ? COLLAPSED_PILL_SIZE : "auto",
            alignSelf: "center",
            textTransform: "none",
            fontSize: "0.8125rem",
            fontWeight: 600,
            borderRadius: 999,
            bgcolor: active === "features" ? "primary.main" : "rgba(124,58,237,0.04)",
            color: active === "features" ? "#fff" : "primary.main",
            "&:hover": {
              bgcolor:
                active === "features"
                  ? "primary.main"
                  : "rgba(124,58,237,0.08)",
            },
            "& .MuiButton-startIcon": isNavCollapsed
              ? {
                  margin: 0,
                }
              : undefined,
          }}
        >
          {isNavCollapsed ? (
            <ViewModuleIcon
              fontSize="small"
              data-testid="features-icon"
            />
          ) : (
            <>
              <ViewModuleIcon
                fontSize="small"
                data-testid="features-icon"
                style={{ marginRight: 8 }}
              />
              Features
            </>
          )}
        </Button>

        <Button
          variant="text"
          fullWidth
          component={NextLink}
          href="/use-cases"
          sx={{
            justifyContent: isNavCollapsed ? "center" : "flex-start",
            minWidth: 0,
            px: isNavCollapsed ? 0 : 2,
            width: isNavCollapsed ? COLLAPSED_PILL_SIZE : EXPANDED_PILL_WIDTH,
            height: isNavCollapsed ? COLLAPSED_PILL_SIZE : "auto",
            alignSelf: "center",
            textTransform: "none",
            fontSize: "0.8125rem",
            fontWeight: 600,
            borderRadius: 999,
            bgcolor:
              active === "use-cases" ? "primary.main" : "rgba(124,58,237,0.04)",
            color: active === "use-cases" ? "#fff" : "primary.main",
            "&:hover": {
              bgcolor:
                active === "use-cases"
                  ? "primary.main"
                  : "rgba(124,58,237,0.08)",
            },
            "& .MuiButton-startIcon": isNavCollapsed
              ? {
                  margin: 0,
                }
              : undefined,
          }}
        >
          {isNavCollapsed ? (
            <AccountTreeIcon
              fontSize="small"
              data-testid="use-cases-icon"
            />
          ) : (
            <>
              <AccountTreeIcon
                fontSize="small"
                data-testid="use-cases-icon"
                style={{ marginRight: 8 }}
              />
              Use Cases
            </>
          )}
        </Button>
      </Box>
    </Box>
  );
}


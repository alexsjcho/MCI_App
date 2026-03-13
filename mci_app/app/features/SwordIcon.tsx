import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

export function SwordIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        d="M12 2v20M8 10h8M11 2h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </SvgIcon>
  );
}


"use client";

import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import { FaBars } from "react-icons/fa";
import Link from "next/link";

interface DropdownMenuProps {
  title?: string;
  icon?: React.ReactNode;
  menuItems: {
    label: string;
    path?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  icon,
  menuItems,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title={title ?? "Open menu"}>
        <IconButton onClick={handleOpenMenu}>
          {icon ?? <FaBars size={24} />}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleCloseMenu();
              if (item.onClick) item.onClick();
            }}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.path ? (
              <Link href={item.path}>
                <Typography>{item.label}</Typography>
              </Link>
            ) : (
              <Typography>{item.label}</Typography>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropdownMenu;

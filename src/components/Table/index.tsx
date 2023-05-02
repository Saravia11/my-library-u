import { useState } from "react";
import {
  Table as MUITable,
  TableContainer,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  Menu,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { TableProps } from "./types";

const Table = <T,>({
  TableProps,
  content,
  actions,
  onRowClick,
}: TableProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentActionItem, setCurrentActionItem] = useState<T>();
  const openActions = Boolean(anchorEl);

  return (
    <TableContainer>
      <MUITable {...TableProps}>
        <TableHead>
          <TableRow>
            {content?.columns?.map((c, i) => (
              <TableCell key={i}>{c.header}</TableCell>
            ))}
            {actions && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {content?.data?.map((v, i) => (
            <TableRow
              key={i}
              onClick={() => {
                onRowClick && onRowClick(v);
              }}
              sx={{ cursor: "pointer" }}
            >
              {content.columns?.map((c, j) => (
                <TableCell key={j}>{c.render(v)}</TableCell>
              ))}
              {actions && (
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);
                      setCurrentActionItem(v);
                    }}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
      {actions && (
        <Menu
          disablePortal
          open={openActions}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {actions?.map((a, k) => (
            <MenuItem
              key={k}
              onClick={() => {
                a.onClick && a.onClick(currentActionItem!);
                setAnchorEl(null);
              }}
            >
              {a.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </TableContainer>
  );
};
export default Table;

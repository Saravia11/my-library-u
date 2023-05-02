import { ChangeEvent, useEffect, useState } from "react";
import {
  Table as MUITable,
  TableContainer,
  InputAdornment,
  FormControl,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  TableRow,
  MenuItem,
  Menu,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { TableProps } from "./types";

const Table = <T,>({
  TableProps,
  content,
  actions,
  searchFields,
  onRowClick,
}: TableProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentActionItem, setCurrentActionItem] = useState<T>();
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [tableData, setTableData] = useState<T[]>(content!.data);
  const [searchValue, setSearchValue] = useState("");
  const openActions = Boolean(anchorEl);

  useEffect(() => {
    if (!searchValue) return setTableData(content!.data);

    const filteredTableData = content!.data.filter((v) => {
      const searchIn = searchFields
        ?.map((sF) => (typeof sF == "function" ? sF(v) : v[sF]))
        .join(" ")
        .toLowerCase();
      return searchIn!.indexOf(searchValue.toLowerCase()) > -1;
    });
    setTableData(filteredTableData);
  }, [searchValue, content?.data]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setShowClearIcon(!!input);
    setSearchValue(input);
  };

  return (
    <TableContainer>
      {searchFields?.length && (
        <FormControl sx={{ margin: 0, width: "90%" }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: showClearIcon ? (
                <InputAdornment
                  position="end"
                  onClick={() => setSearchValue("")}
                >
                  <ClearIcon style={{ cursor: "pointer" }} />
                </InputAdornment>
              ) : undefined,
            }}
          />
        </FormControl>
      )}
      <MUITable {...TableProps}>
        <TableHead>
          <TableRow>
            {content?.columns?.map((c, i) => (
              <TableCell
                key={i}
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                {c.header}
              </TableCell>
            ))}
            {actions && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((v, i) => (
            <TableRow
              key={i}
              onClick={() => {
                onRowClick && onRowClick(v);
              }}
              sx={{ cursor: "pointer" }}
            >
              {content?.columns?.map((c, j) => (
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

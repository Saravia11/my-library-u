import {
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table as MUITable,
} from "@mui/material";
import { TableProps } from "./types";

const Table = <T,>({ TableProps, content }: TableProps<T>) => {
  return (
    <TableContainer>
      <MUITable {...TableProps}>
        <TableHead>
          <TableRow>
            {content?.columns?.map((c, i) => (
              <TableCell key={i}>{c.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {content?.data?.map((v, i) => (
            <TableRow key={i}>
              {content.columns?.map((c, j) => (
                <TableCell key={j}>{c.render(v)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};
export default Table;

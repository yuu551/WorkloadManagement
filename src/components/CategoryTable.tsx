import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Category } from "../types/Category";
import { useQueryClient } from "react-query";

const WorkloadTable = () => {
  return (
    <>
      <TableList></TableList>
    </>
  );
};

const TitleName = () => {};

const TableList = () => {
  const queryClient = useQueryClient()
  const categories = queryClient.getQueryData<Category[]>('categories');

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>カテゴリ名</TableCell>
            <TableCell>備考</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.map((row: Category, idx: number) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.category_name}</TableCell>
              <TableCell>{row?.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkloadTable;
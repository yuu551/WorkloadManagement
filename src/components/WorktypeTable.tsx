import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { WorkType } from "../types/Worktype";
import { Category } from "../types/Category";
import { useQueryClient } from "react-query";

const WorktypeTable = () => {
  return (
    <>
      <TableList></TableList>
    </>
  );
};

const TableList = () => {
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<Category[]>("categories");
  const worktypes = queryClient.getQueryData<WorkType[]>("worktypes");

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>カテゴリ</TableCell>
            <TableCell>作業名</TableCell>
            <TableCell>備考</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {worktypes?.map((row: WorkType, idx: number) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {
                  categories?.find(
                    (category: Category) =>
                      category.category_id === row.category_id
                  )?.category_name
                }
              </TableCell>
              <TableCell>{row.worktype_name}</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorktypeTable;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Workload } from "../types/Workload";
import { CircularProgress } from "@mui/material";
import { Category } from "../types/Category";
import { useAuth } from "../auth/AuthProvider";
import { useQueryCategories } from "../hooks/useQueryCategories";
import { useQueryWorktypes } from "../hooks/userQueryWorktypes";
import { useQueryWorkloads } from "../hooks/useQueryWorkloads";

const WorkloadTable = () => {
  return (
    <>
      <TableList></TableList>
    </>
  );
};

const TableList = () => {
  const { user } = useAuth();
  const { status: categoryStatus, data: categories } = useQueryCategories();
  const { status: worktypeStatus } = useQueryWorktypes(user?.email);
  const { status: workloadStatus, data: workloads } = useQueryWorkloads(
    user?.email
  );

  if (
    worktypeStatus === "loading" ||
    categoryStatus === "loading" ||
    workloadStatus === "loading"
  )
    return <CircularProgress />;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>作業日</TableCell>
            <TableCell>作業時間（h）</TableCell>
            <TableCell>カテゴリ</TableCell>
            <TableCell>内容</TableCell>
            <TableCell>備考</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workloads?.map((row: Workload, idx: number) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {getDateString(row.work_day.toDate())}
              </TableCell>
              <TableCell>{row.work_time}</TableCell>
              <TableCell>
                {
                  categories?.find((category: Category) => {
                    return category?.category_id === row.category_id;
                  })?.category_name
                }
              </TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row?.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const getDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayofweek = date.getDay();
  const dayname = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    year + "年" + month + "月" + day + "日" + "（" + dayname[dayofweek] + "）"
  );
};

export default WorkloadTable;

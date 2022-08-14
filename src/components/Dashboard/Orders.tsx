import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useQueryClient } from "react-query";
import { Workload } from "../../types/Workload";
import { Category } from "../../types/Category";
import { Link as RouterLink } from "react-router-dom";


export default function Orders() {
  const queryClient = useQueryClient();
  const workloads = queryClient.getQueryData<Workload[]>("workloads");
  const categories = queryClient.getQueryData<Category[]>("categories");
  if (!workloads) return <div>Error</div>;
  const headWorkloads = workloads.slice(0,7)
  return (
    <React.Fragment>
      <Title>直近の作業</Title>
      <Table size="small" aria-label="a dense table">
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
          {headWorkloads?.map((row: Workload, idx: number) => (
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
      <Link component={RouterLink} to={"/"} sx={{marginTop:"5px"}}>詳細はこちら</Link>
    </React.Fragment>
  );
}

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

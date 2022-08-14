import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useQueryClient } from "react-query";
import { Workload } from "../../types/Workload";

export default function Deposits() {
  const queryClient = useQueryClient();
  const workloads = queryClient.getQueryData<Workload[]>("workloads");
  if (!workloads) return <div>Error</div>;
  const workTime = fillteredWorkload(workloads)

  return (
    <React.Fragment>
      <Title>今月の作業時間</Title>
      <div style={{ marginTop: "40px" }}>
        <Typography component="p" variant="h4">
          {Math.round(workTime *100)/100}h
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 ,marginTop:"5px" }}>
          {getDateString(new Date())}時点
        </Typography>
      </div>
    </React.Fragment>
  );
}

const fillteredWorkload = (workloads: Workload[]) => {
  return workloads
    .filter((workload) => {
      return workload.work_time === workload.work_time
    })
    .filter((workload) => {
      return workload.work_day.toDate().getMonth() === new Date().getMonth();
    })
    .reduce((result, current) => {
      return result += current.work_time
    }, 0);
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

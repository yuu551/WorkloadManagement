import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { useQueryClient } from "react-query";
import { Workload } from "../../types/Workload";
import { el } from "date-fns/locale";

type WorkTimeData = {
  workDay: string;
  workTime: number;
};

export default function Chart() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const workloads = queryClient.getQueryData<Workload[]>("workloads");
  if (!workloads) return <div>Error</div>;
  const workloadData = fillWorkload(workloads);

  return (
    <React.Fragment>
      <Title>一週間の作業時間</Title>
      <ResponsiveContainer>
        <LineChart
          data={workloadData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="workDay"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              作業時間 (h)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="workTime"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

const fillWorkload = (workloads: Workload[]): WorkTimeData[] => {
  const nowDate = new Date();
  const beforeDate = new Date();
  beforeDate.setDate(beforeDate.getDate() - 7);
  const fillteredWorkloads = workloads.filter((workload) => {
    return (
      beforeDate <= workload.work_day.toDate() &&
      workload.work_day.toDate() <= nowDate
    );
  });
  const convertedWorkTime = crateWorkloadData(fillteredWorkloads);
  const emptyArray: WorkTimeData[] = [];
  return convertedWorkTime
    .reduce((result, current) => {
      const elm = result.find((p) => p.workDay === current.workDay);
      if (elm) elm.workTime += current.workTime;
      else result.push(current);
      return result;
    }, emptyArray)
    .sort((a, b) => {
      return a > b ? 1 : -1;
    });
};

const crateWorkloadData = (workloads: Workload[]): WorkTimeData[] => {
  return workloads.map((workload) => {
    return {
      workDay: getDateString(workload.work_day.toDate()),
      workTime: workload.work_time,
    };
  });
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

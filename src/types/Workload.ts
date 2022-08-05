import { Timestamp } from "firebase/firestore";

export type Workload = {
  workload_id: number;
  work_time: number;
  user_mail_address: string;
  work_day: Timestamp;
  content: string;
  category_id: number;
  description: string;
};

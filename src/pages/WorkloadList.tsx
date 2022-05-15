import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import WorkloadTable from "../components/WorkloadTable";
import Header from "../components/Header";

const WorkloadList = () => {
  return (
    <>
      <Header />
      <Box m={3}>
        <Typography variant="h5">工数一覧</Typography>
      </Box>
      <Box m={3} display="flex" alignItems="center" justifyContent="center">
        <WorkloadTable />
      </Box>
    </>
  );
};

export default WorkloadList;
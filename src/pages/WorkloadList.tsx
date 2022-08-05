import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import WorkloadTable from "../components/WorkloadTable";
import Header from "../components/Header";
import SearchIcon from "@mui/icons-material/Search";

const WorkloadList = () => {
  return (
    <>
      <Header />
      <Box m={3} display="flex">
        <Typography variant="h5">工数一覧</Typography>
        <SearchIcon sx={{ marginLeft: "15px" }} fontSize="large" />
      </Box>
      <Box m={3} display="flex" alignItems="center" justifyContent="center">
        <WorkloadTable />
      </Box>
    </>
  );
};

export default WorkloadList;

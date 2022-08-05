import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import WorktypeTable from "../components/WorktypeTable";
import Header from "../components/Header";

const WorkTypeList = () => {
  return (
    <>
      <Header />
      <Box m={3}>
        <Typography variant="h5">作業一覧</Typography>
      </Box>
      <Box m={3} display="flex" alignItems="center" justifyContent="center">
        <WorktypeTable />
      </Box>
    </>
  );
};

export default WorkTypeList;

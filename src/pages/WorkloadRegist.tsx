import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import WorkloadForm from "../components/WorkloadForm";
import Header from "../components/Header";

const WorkloadRegist = () => {
    return (
      <>
      <Header />
        <Box m={3}>
            <Typography variant="h5">工数登録</Typography>
        </Box>
        <Box m={3} display="flex" alignItems="center" justifyContent="center">
          <WorkloadForm />
        </Box>
      </>
    );
  };
  
  export default WorkloadRegist;
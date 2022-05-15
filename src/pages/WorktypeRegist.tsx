import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import WorktypeForm from "../components/WorktypeForm";
import Header from "../components/Header";

const WorktypeRegist = () => {
    return (
      <>
      <Header />
        <Box m={3}>
            <Typography variant="h5">作業登録</Typography>
        </Box>
        <Box m={3} display="flex" alignItems="center" justifyContent="center">
          <WorktypeForm />
        </Box>
      </>
    );
  };
  
  export default WorktypeRegist;
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import WorkloadForm from "../components/WorkloadForm";
import Header from "../components/Header";
import Container from "@mui/material/Container";

const WorkloadRegist = () => {
  return (
    <>
      <Header />
      <Container
        fixed
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box m={12} display="flex" alignItems="center" justifyContent="center">
          <WorkloadForm />
        </Box>
      </Container>
    </>
  );
};

export default WorkloadRegist;

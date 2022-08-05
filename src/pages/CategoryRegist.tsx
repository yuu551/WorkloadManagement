import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import CategoryForm from "../components/CategoryForm";
import Header from "../components/Header";

const WorkloadRegist = () => {
  return (
    <>
      <Header />
      <Box m={3}>
        <Typography variant="h5">カテゴリ登録</Typography>
      </Box>
      <Box m={3} display="flex" alignItems="center" justifyContent="center">
        <CategoryForm />
      </Box>
    </>
  );
};

export default WorkloadRegist;

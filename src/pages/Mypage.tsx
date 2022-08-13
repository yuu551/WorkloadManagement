import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import CategoryForm from "../components/CategoryForm";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard/Dashboard";

const Mypage = () => {
  return (
    <>
      <Header />
      <Box m={1} display="flex" alignItems="center" justifyContent="center">
        <Dashboard />
      </Box>
    </>
  );
};

export default Mypage;
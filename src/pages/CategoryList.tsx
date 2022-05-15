import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import CategoryTable from "../components/CategoryTable";
import Header from "../components/Header";

const CategoryList = () => {
  return (
    <>
      <Header />
      <Box m={3}>
        <Typography variant="h5">カテゴリ一覧</Typography>
      </Box>
      <Box m={3} display="flex" alignItems="center" justifyContent="center">
        <CategoryTable />
      </Box>
    </>
  );
};

export default CategoryList;
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Category } from "../types/Category";
import { useMutateCategories } from "../hooks/useMutateCategories";
import { Paper, Typography } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type categoryFormType = {
  category_name: string;
  description: string;
};

const WorkloadForm = () => {
  const [open, setOpen] = React.useState(false);
  const { createWorkloadMutation } = useMutateCategories();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const { control, handleSubmit, reset } = useForm<categoryFormType>();
  const onSubmit: SubmitHandler<categoryFormType> = async (data) => {
    console.log(transCategoryType(data));
    const category = transCategoryType(data);
    if (!category) return;
    try {
      await createWorkloadMutation.mutateAsync(category);
      reset();
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack
        spacing={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            カテゴリを登録しました！
          </Alert>
        </Snackbar>
        <Paper
          elevation={4}
          sx={{
            height: "480px",
            width: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" textAlign="center">
              カテゴリー登録
            </Typography>
            <AppRegistrationIcon sx={{ marginLeft: "5px", fontSize: "30px" }} />
          </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ width: "400px", textAlign: "center" }} marginX="50px" marginTop="15px">
              <Controller
                name="category_name"
                control={control}
                defaultValue=""
                rules={{
                  required: "カテゴリーは必須です！",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="カテゴリ名"
                    margin="normal"
                    fullWidth
                    placeholder="カテゴリ名"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
            </Box>
          <Box sx={{ width: "400px", marginX: "50px" }}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="備考"
                  margin="normal"
                  fullWidth
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder="備考"
                />
              )}
            />
          </Box>
          <Box sx={{ m: 2, textAlign: "center" }}>
            <Button variant="contained" type="submit" sx={{ width: "100px" }}>
              登録
            </Button>
          </Box>
        </form>
        </Paper>
      </Stack>
    </>
  );
};

const transCategoryType = (categoryData: categoryFormType) => {
  const category: Category = {
    category_id: 0,
    category_name: categoryData.category_name,
    description: categoryData.description,
  };
  return category;
};

export default WorkloadForm;

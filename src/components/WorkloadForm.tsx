import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Workload } from "../types/Workload";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import { useAuth } from "../auth/AuthProvider";
import { Timestamp } from "firebase/firestore";
import { Firebase } from "../firebase/init";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Category } from "../types/Category";
import sha256 from "crypto-js/sha256";
import { useQueryClient } from "react-query";
import { useMutateWorkloads } from "../hooks/useMutateWorkloads";
import { Paper, Typography } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type workloadFormType = {
  category: string;
  content: string;
  work_day: string;
  work_time: string;
  description: string;
};

const WorkloadForm = () => {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<Category[]>("categories");
  const { createWorkloadMutation } = useMutateWorkloads();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const { control, handleSubmit, reset } = useForm<workloadFormType>();
  const onSubmit: SubmitHandler<workloadFormType> = async (data) => {
    console.log(transWorkloadType(data, user));
    const workload = transWorkloadType(data, user);
    if (!workload) return;
    try {
      await createWorkloadMutation.mutateAsync(workload);
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
            工数を登録しました！
          </Alert>
        </Snackbar>
        <Paper
          elevation={4}
          sx={{
            height: "680px",
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
              工数登録
            </Typography>
            <AppRegistrationIcon sx={{ marginLeft: "5px", fontSize: "30px" }} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box width="400px" marginX="50px" marginTop="15px">
              <Controller
                control={control}
                name="category"
                defaultValue=""
                rules={{
                  required: "カテゴリーは必須です！",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="カテゴリー"
                    id="select"
                    fullWidth
                    margin="normal"
                    select
                    error={Boolean(error)}
                    helperText={error?.message}
                  >
                    {categories?.map((category: Category) => {
                      return (
                        <MenuItem
                          key={category.category_id}
                          value={category.category_id}
                        >
                          {category.category_name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </Box>
            <Box sx={{ width: "400px", marginX: "50px" }}>
              <Controller
                name="content"
                control={control}
                defaultValue=""
                rules={{
                  required: "作業内容は必須です！",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="作業内容"
                    margin="normal"
                    fullWidth
                    placeholder="作業内容"
                    error={Boolean(error)}
                    helperText={error?.message}
                  >
                  </TextField>
                )}
              />
            </Box>
            <Box sx={{ width: "400px", marginX: "50px" }}>
              <Controller
                name="work_day"
                control={control}
                defaultValue={new Date().toString()}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      {...field}
                      label="作業日"
                      inputFormat="yyyy年MM月dd日"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          margin="normal"
                          defaultValue=""
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </Box>
            <Box sx={{ width: "400px", marginX: "50px" }}>
              <Controller
                name="work_time"
                control={control}
                defaultValue=""
                rules={{
                  required: "作業時間は必須です！",
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    message: "数値を入力してください！",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="作業時間"
                    margin="normal"
                    fullWidth
                    defaultValue=""
                    placeholder="作業時間"
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
              <Button
                variant="contained"
                type="submit"
                sx={{ marginTop: "18px", width: "120px", fontSize: "15px" }}
              >
                登録
              </Button>
            </Box>
          </form>
        </Paper>
      </Stack>
    </>
  );
};

const transWorkloadType = (
  workloadData: workloadFormType,
  user: Firebase.User | null
) => {
  if (!user || !user.email) return null;
  const workload: Workload = {
    workload_id: 0,
    content: workloadData.content,
    work_time: Number(workloadData.work_time),
    user_mail_address: sha256(user.email).toString(),
    category_id: Number(workloadData.category),
    description: workloadData.description,
    work_day: Firebase.firestore.Timestamp.fromDate(
      new Date(workloadData.work_day)
    ) as Timestamp,
  };
  return workload;
};

export default WorkloadForm;

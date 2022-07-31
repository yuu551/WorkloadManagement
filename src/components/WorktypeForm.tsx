import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import { useAuth } from "../auth/AuthProvider";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Category } from "../types/Category";
import sha256 from "crypto-js/sha256";
import { Firebase } from "../firebase/init";
import { WorkType } from "../types/Worktype";
import MenuItem from "@mui/material/MenuItem";
import { useQueryClient } from "react-query";
import { useMutateWorkTypes } from "../hooks/useMutateWorktypes";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type worktypeFormType = {
  category_id: string;
  worktype_name: string;
  description: string;
};

const WorkTypeForm = () => {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient()
  const categories = queryClient.getQueryData<Category[]>('categories')
  const { createWorkTypeMutation } = useMutateWorkTypes();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<worktypeFormType>();
  const onSubmit: SubmitHandler<worktypeFormType> = async (data) => {
    console.log(transWorktype(data,user));
    const worktype = transWorktype(data,user);
    if (!worktype) return;
    try {
      await createWorkTypeMutation.mutateAsync(worktype);
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
            作業を登録しました！
          </Alert>
        </Snackbar>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ width: "400px"}}>
            <Controller
              control={control}
              name="category_id"
              defaultValue=""
              rules={{
                required:"カテゴリーは必須です！"
              }}
              render={({ field,fieldState:{error} }) => (
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
                  {categories?.map((category : Category) => {
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
          <Box sx={{ width: "400px", textAlign: "center" }}>
            <Controller
              name="worktype_name"
              control={control}
              defaultValue=""
              rules={{
                required:"作業名は必須です！"
              }}
              render={({ field,fieldState:{error} }) => (
                <TextField
                  {...field}
                  label="作業名"
                  margin="normal"
                  fullWidth
                  placeholder="作業名"
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ width: "400px", textAlign: "cenetr" }}>
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
      </Stack>
    </>
  );
};

const transWorktype = (
  worktypeFormData: worktypeFormType,
  user: Firebase.User | null
) => {
  if (!user || !user.email) return null;
  const worktype: WorkType = {
    worktype_id: 0,
    category_id: Number(worktypeFormData.category_id),
    worktype_name: worktypeFormData.worktype_name,
    user_mail_address: sha256(user.email).toString(),
    description: worktypeFormData.description,
  };
  return worktype;
};

export default WorkTypeForm;

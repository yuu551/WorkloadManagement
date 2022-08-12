import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchIcon from "@mui/icons-material/Search";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export type DialogProps = {
  isClosed: boolean;
};

type workloadSerachType = {
  work_day: string;
};

const WorkloadSearchDialog = (props: DialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { control, handleSubmit, reset } = useForm<workloadSerachType>();

  const onSubmit: SubmitHandler<workloadSerachType> = async (data) => {
    console.log("test");
  };

  return (
    <>
      <Button variant="text" onClick={() => handleClickOpen()}>
        <SearchIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle sx={{ textAlign: "center" }}>日付検索</DialogTitle>
        <DialogContent sx={{ width: "500px", height: "120px" }}>
          <DialogContentText sx={{ textAlign: "center" }}>
            検索したい日付を入力してださい。
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex",
                alignItems: "center",
                justifyContent: "center",marginTop:"15px"}}>
            <Box
              sx={{
                width: "400px",
              }}
            >
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>検索</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WorkloadSearchDialog;

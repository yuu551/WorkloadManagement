import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Firebase, auth } from "../firebase/init";
import { Box } from "@mui/material";

const uiConfig = {
  signInFlow: "/login",
  signInSuccessUrl: "/",
  signInOptions: [Firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

const Login = () => {
  return (
    <>
      <Box
        m={25}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </Box>
    </>
  );
};

export default Login;

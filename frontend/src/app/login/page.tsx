"use client";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Grid } from "@mui/material";
import { useUserAuth } from "@/components/AuthProvider";
import { LoadingButton } from "@mui/lab";

function isValidEmail(email: string) {
  var re =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  return re.test(email);
}

export default function SignIn() {
  const auth = useUserAuth();
  const navigate = useRouter();

  const [emailConfig, setEmailConfig] = useState({
    email: "",
    isValidEmail: true,
  });
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = () => {
    if (!password) return true;
    if (!isValidEmail(emailConfig.email)) return true;
    return false;
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);

      await auth?.logIn(emailConfig.email, password);
      navigate.replace("/");
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);

      console.log("err", err);

      if (err?.response?.data?.message) {
        alert(err?.response?.data?.message);
        return;
      }

      if (err && typeof err?.message == "string") {
        alert(err?.message);
      }
    }
  };

  return (
    <Box
      sx={{
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={emailConfig.email}
          onChange={(e) => {
            setEmailConfig({
              email: e.target.value,
              isValidEmail: isValidEmail(e.target.value),
            });
          }}
          error={!emailConfig?.isValidEmail}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <LoadingButton
          loading={isLoading}
          fullWidth
          variant="contained"
          disabled={isDisabled()}
          sx={{ mt: 3, mb: 2 }}
          onClick={handleClick}
        >
          Sign In
        </LoadingButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Box
              onClick={() => {
                navigate.push("/signup");
              }}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Create new account? Sign up
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

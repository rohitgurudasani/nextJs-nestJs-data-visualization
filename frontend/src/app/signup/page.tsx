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

function isValidPassword(password: string) {
  var re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return re.test(password);
}

export default function SignUp() {
  const auth = useUserAuth();
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [emailConfig, setEmailConfig] = useState({
    email: "",
    isValidEmail: true,
  });
  const [passwordConfig, setPasswordConfig] = useState({
    password: "",
    isValidPassword: true,
  });

  const isDisabled = () => {
    if (
      isValidPassword(passwordConfig?.password) &&
      isValidEmail(emailConfig.email)
    )
      return false;
    // if (isValidEmail(emailConfig.email)) return false;
    return true;
  };

  const handleClick = async () => {
    console.log("click received in login button");
    try {
      setIsLoading(true);
      await auth?.signUp(emailConfig.email, passwordConfig?.password);

      alert("user registered, please login");
      navigate.replace("/login");
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);

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
        Sign up
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
          value={passwordConfig?.password}
          onChange={(e) => {
            setPasswordConfig({
              ...passwordConfig,
              password: e.target.value,
              isValidPassword: isValidPassword(e.target.value),
            });
          }}
          error={!passwordConfig?.isValidPassword}
        />
        {!passwordConfig?.isValidPassword && (
          <Typography
            sx={{ color: "red", fontSize: "12px", fontStyle: "italic" }}
          >
            Password should contain at least one number, one special character,
            one lowercase, one uppercase letter, minimum of eight characters.
          </Typography>
        )}

        <LoadingButton
          loading={isLoading}
          fullWidth
          variant="contained"
          disabled={isDisabled()}
          sx={{ mt: 3, mb: 2 }}
          onClick={handleClick}
        >
          Sign Up
        </LoadingButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Box
              onClick={() => {
                navigate.push("/login");
              }}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Already have an account? Sign in
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

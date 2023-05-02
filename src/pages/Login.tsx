import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../services/user.service";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fd = new FormData(event.currentTarget);
    try {
      const user = await login(
        fd.get("email")!.toString(),
        fd.get("password")!.toString()
      );
      navigate(`/${user?.role}`);
    } catch (error: any) {
      console.error(error);
      if (error.response.status == 404)
        toast("Incorrect user or password", {
          type: "error",
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>My U Library - Login</title>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              type="email"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer hideProgressBar />
    </ThemeProvider>
  );
}

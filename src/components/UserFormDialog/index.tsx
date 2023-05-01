import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUser } from "../../services/user.service";
import {
  faRotateRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  FormHelperText,
  InputAdornment,
  DialogContent,
  FormControl,
  DialogTitle,
  InputLabel,
  TextField,
  MenuItem,
  Dialog,
  Button,
  Select,
  Box,
  IconButton,
} from "@mui/material";
import type { UserFormDialogType } from "./index.d";
import type { UserValues } from "../../types/user";

import style from "./styles.module.scss";

type FormValues = UserValues & { password: string };
const UserFormDialog: UserFormDialogType = ({
  open,
  onClose,
  onCreationFinish,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    const { success, data } = await createUser(values);
    onCreationFinish && onCreationFinish(success, data.message);
  };

  const initialValues: FormValues = {
    name: "",
    last_name: "",
    email: "",
    role: "student",
    password: "",
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New user</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Schema}
          validateOnChange={false}
        >
          {({ values, errors, handleChange, setFieldValue }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  padding: "15px 0",
                  width: "500px",
                }}
              >
                <TextField
                  label="Name"
                  name="name"
                  placeholder="Type your name(s)"
                  value={values.name}
                  helperText={errors.name}
                  error={!!errors.name}
                  onChange={handleChange}
                />
                <TextField
                  label="Last name"
                  name="last_name"
                  placeholder="Type your last name"
                  value={values.last_name}
                  helperText={errors.last_name}
                  error={!!errors.last_name}
                  onChange={handleChange}
                />
                <TextField
                  label="Email"
                  name="email"
                  placeholder="Type your email"
                  value={values.email}
                  helperText={errors.email}
                  error={!!errors.email}
                  onChange={handleChange}
                />
                <FormControl
                  fullWidth
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Password"
                    name="password"
                    value={values.password}
                    helperText={errors.password}
                    error={!!errors.password}
                    type={showPassword ? "text" : "password"}
                    sx={{ flex: "1 1 auto" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                          >
                            <FontAwesomeIcon
                              icon={showPassword ? faEye : faEyeSlash}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleChange}
                  />
                  <FontAwesomeIcon
                    icon={faRotateRight}
                    className={style.generate_password}
                    title="Generate random password"
                    onClick={() =>
                      setFieldValue(
                        "password",
                        Math.random().toString(36).slice(-8).toUpperCase()
                      )
                    }
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="id-role-label">Role</InputLabel>
                  <Select
                    labelId="id-role-label"
                    label="Role"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="librarian">Librarian</MenuItem>
                  </Select>
                  {errors.role && (
                    <FormHelperText>Incorrect role</FormHelperText>
                  )}
                </FormControl>
                <Button type="submit" variant="contained" color="secondary">
                  Add new user
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default UserFormDialog;

const Schema = Yup.object({
  name: Yup.string().required("Names are required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("It's not an email").required("Email is required"),
  role: Yup.string(),
  password: Yup.string()
    .min(8, "Minimum characters: 8")
    .required("Password is required"),
});

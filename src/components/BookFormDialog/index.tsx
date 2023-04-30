import * as Yup from "yup";
import { Formik, Form } from "formik";
import useGenres from "../../hooks/useGenres";
import { createBook } from "../../services/books.service";
import {
  FormHelperText,
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
} from "@mui/material";
import type { BookFormDialogType } from "./index.d";
import type { BookValues } from "../../types/books";

const FIRST_BOOK_PUBLISHED_YEAR = 1449;
const BookFormDialog: BookFormDialogType = ({
  open,
  onClose,
  onCreationFinish,
}) => {
  const { genresLoading, genres } = useGenres();

  const handleSubmit = async (values: BookValues) => {
    const { success, data } = await createBook(values);
    onCreationFinish && onCreationFinish(success, data.message);
  };

  // Years from 1449 to current year
  const years = Array.from(
    {
      length: new Date().getFullYear() - FIRST_BOOK_PUBLISHED_YEAR + 1,
    },
    (_, i) => FIRST_BOOK_PUBLISHED_YEAR + i
  );
  const initialValues: BookValues = {
    title: "",
    author: "",
    published_year: FIRST_BOOK_PUBLISHED_YEAR,
    genre: "",
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New book</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Schema}
          validateOnChange={false}
        >
          {({ values, errors, handleChange }) => (
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
                  value={values.title}
                  name="title"
                  label="Title"
                  placeholder="Type a title here"
                  error={!!errors.title}
                  helperText={errors.title}
                  onChange={handleChange}
                />
                <TextField
                  value={values.author}
                  name="author"
                  label="Author"
                  placeholder="Type an author"
                  error={!!errors.author}
                  helperText={errors.author}
                  onChange={handleChange}
                />
                <FormControl fullWidth>
                  <InputLabel id="published_year_label">
                    Published year
                  </InputLabel>
                  <Select
                    label="Published year"
                    labelId="published_year_label"
                    name="published_year"
                    value={values.published_year}
                    onChange={handleChange}
                  >
                    {years.map((v, i) => (
                      <MenuItem value={v} key={i}>
                        {v}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {!genresLoading && (
                  <FormControl fullWidth>
                    <InputLabel id="genres_label">Genres</InputLabel>
                    <Select
                      label="Genres"
                      labelId="genres_label"
                      name="genre"
                      error={!!errors.genre}
                      value={values.genre}
                      onChange={handleChange}
                    >
                      {genres?.map((g, i) => (
                        <MenuItem value={g._id} key={i}>
                          {g.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.genre && (
                      <FormHelperText error>Error</FormHelperText>
                    )}
                  </FormControl>
                )}
                <Button type="submit" variant="contained" color="secondary">
                  Add new book
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default BookFormDialog;

const Schema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  published_year: Yup.number().required("Published year is required"),
  genre: Yup.string().required("Genre is required"),
});

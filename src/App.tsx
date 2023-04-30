import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Student from "./pages/Student";
import Librarian from "./pages/Librarian";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/student", element: <Student /> },
  { path: "/librarian", element: <Librarian /> },
]);

const App = () => <RouterProvider router={router} />;

export default App;

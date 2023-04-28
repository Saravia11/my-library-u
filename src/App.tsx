import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Student from "./pages/Student";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/student", element: <Student /> },
]);

const App = () => <RouterProvider router={router} />;

export default App;

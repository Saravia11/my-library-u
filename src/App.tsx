import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import Student from "./pages/Student";
import Librarian from "./pages/Librarian";

import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  { path: "/", loader: () => redirect("/login") },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const role = Cookies.get("user_role");
      return role ? redirect(`/${role}`) : null;
    },
  },
  {
    path: "/student",
    element: <Student />,
    loader: () => {
      const role = Cookies.get("user_role");
      if (!role) return redirect("/login");
      return role == "librarian" ? redirect("/librarian") : null;
    },
  },
  {
    path: "/librarian",
    element: <Librarian />,
    loader: () => {
      const role = Cookies.get("user_role");
      if (!role) return redirect("/login");
      return role == "student" ? redirect("/student") : null;
    },
  },
]);

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;

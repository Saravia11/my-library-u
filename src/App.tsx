import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/Login";
import Student from "./pages/Student";
import Librarian from "./pages/Librarian";

import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  { path: "/", loader: () => redirect("/login") },
  { path: "/login", element: <Login /> },
  { path: "/student", element: <Student /> },
  { path: "/librarian", element: <Librarian /> },
]);

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;

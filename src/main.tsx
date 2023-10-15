import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MyBlogs } from "./pages/MyBlogs.tsx";
import { BlogContextProviver } from "./context/blogContext.tsx";
import { Home } from "./pages/Home.tsx";
import { Blog } from "./pages/Blog.tsx";
import { AuthContextProvider } from "./context/authContext.tsx";
import { PrivateRoute } from "./auth/PrivateRoute.tsx";
import { Login } from "./pages/Login.tsx";
import { Signup } from "./pages/Signup.tsx";
import { AddBlog } from "./pages/AddBlog.tsx";
import { Admin } from "./pages/Admin.tsx";
import { EditBlog } from "./pages/EditBlog.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/myblogs",
        element: (
          <PrivateRoute>
            <MyBlogs />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog/add",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog/edit/:id",
        element: (
          <PrivateRoute>
            <EditBlog />
          </PrivateRoute>
        ),
      },
      { path: "/blog/:id", element: <Blog /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BlogContextProviver>
        <RouterProvider router={router} />
      </BlogContextProviver>
    </AuthContextProvider>
  </React.StrictMode>
);

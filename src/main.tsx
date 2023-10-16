import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MyBlogs } from "./pages/MyBlogs.tsx";
import { Home } from "./pages/Home.tsx";
import { Blog } from "./pages/Blog.tsx";
import { AuthContextProvider } from "./context/authContext.tsx";
import { PrivateRoute } from "./auth/PrivateRoute.tsx";
import { Login } from "./pages/Login.tsx";
import { Signup } from "./pages/Signup.tsx";
import { AddBlog } from "./pages/AddBlog.tsx";
import { Admin } from "./pages/Admin.tsx";
import { EditBlog } from "./pages/EditBlog.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CreatePassword } from "./pages/CreatePassword.tsx";
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
  { path: "/login/createpassword", element: <CreatePassword /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="599820019629-suufgudpi5g662o3qbjr9fibiluosup4.apps.googleusercontent.com">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

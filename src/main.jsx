import React from "react"
import * as ReactDOM from "react-dom/client"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import ErrorPage from "./error-page"
import Login from "./routes/root"
import Home from "./routes/home"
import SignIn from "./routes/sign-in"
import Cart from "./routes/cart"
import Product from "./routes/product"

const router = createBrowserRouter([
    {
        path:"/",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/home",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/sign-in",
        element: <SignIn />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/cart",
        element: <Cart />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/product/:id",
        element: <Product />,
        errorElement: <ErrorPage />
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
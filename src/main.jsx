import React from "react"
import * as ReactDOM from "react-dom/client"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import ErrorPage from "./error-page"
import Login from "./routes/root"
import Home from "./routes/home"
import Cart from "./routes/cart"
import Product from "./routes/product"
import Admin from "./routes/admin"
import Payment from "./routes/pago"
import Compras from "./routes/compras"

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
        path: "/cart",
        element: <Cart />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/product/:id",
        element: <Product />,
        errorElement: <ErrorPage />
    },
    {
        path: "/admin",
        element: <Admin />,
        errorElement: <ErrorPage />
    },
    {
        path: "/pago",
        element: <Payment />,
        errorElement: <ErrorPage />
    },
    {
        path: "/compras",
        element: <Compras />,
        errorElement: <ErrorPage />
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
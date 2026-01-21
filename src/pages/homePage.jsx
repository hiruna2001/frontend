import { Route, Routes } from "react-router-dom"
import Header from "../components/Header"
//import TestPage from "./test"
import { ProductPage } from "./productPage"
import ProductOverView from "./productOverView"
import CartPage from "./cart"
import CheckoutPage from "./checkout"

export default function HomePage() {
    return (
        <div className="w-full h-full bg-primary">
            <Header />
            <Routes path="/">
                <Route path="/home" element={<h1> Welcome to Home Page</h1>} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/about" element={<h1>About Page</h1>} />
                <Route path="/contact" element={<h1>Contact Page</h1>} />
                
                <Route path="/overview/:id" element={<ProductOverView />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/*" element={<h1>404 Page</h1>} />
            </Routes>


        </div>
    )
}
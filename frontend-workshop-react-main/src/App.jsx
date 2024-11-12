import { BrowserRouter, Routes, Route } from "react-router-dom" 
import Login from "./pages/Auth/login"
import Register from "./pages/Auth/register"
import Products from "./pages/Products"

export default function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}/>

        <Route path="/products" element={<Products />} /> 
      </Routes>
    </BrowserRouter>
   </>
  )
}

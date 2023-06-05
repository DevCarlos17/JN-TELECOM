import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Error404.jsx";
import LayoutAdmin from "./layout/LayoutAdmin.jsx";
import ForgetPassword from "./pages/auth/ForgetPassword.jsx";
import Home from "./pages/admin/Home.jsx";
import GlobalSales from "./pages/admin/GlobalSales.jsx";
import NewSale from "./pages/admin/NewSale.jsx";
import Signin from "./pages/auth/Signin.jsx";
import Signup from "./pages/auth/Signup.jsx";
import SaleEdit from "./pages/admin/SaleEdit.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<Signin />} />
          <Route path="home" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="ventas" element={<GlobalSales />} />
          <Route path="sale/:id" element={<SaleEdit />} />
          <Route path="newSale" element={<NewSale />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

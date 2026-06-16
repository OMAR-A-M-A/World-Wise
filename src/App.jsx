import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path="product" element={<Product></Product>}></Route>
        <Route path="pricing" element={<Pricing></Pricing>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="app" element={<AppLayout></AppLayout>}>
          <Route index element={<p>List</p>}></Route>
          <Route path="cities" element={<p>city</p>}></Route>
          <Route path="countries" element={<p>Country</p>}></Route>
          <Route path="form" element={<p>form</p>}></Route>
        </Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

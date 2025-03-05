// src/routes.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ProductsList from './pages/ProductsList';
import ProductsDetails from './pages/ProductsDetails';

export default function AppRoutes() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductsDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );    
}

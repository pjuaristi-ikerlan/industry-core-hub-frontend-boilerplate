import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import './App.css'

import ProductsListPage from './pages/ProductsListPage';
import ProductsDetailPage from './pages/ProductsDetailPage';
import MainLayout from './layout/MainLayout';

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />}>
          <Route path="/" element={<ProductsListPage />} />
          <Route path="/product/:id" element={<ProductsDetailPage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App

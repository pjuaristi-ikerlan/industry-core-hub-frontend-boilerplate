import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import './App.css'

import ProductsListPage from './pages/ProductsListPage';
import ProductsDetailPage from './pages/ProductsDetailPage';

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<ProductsListPage />} />
        <Route path="/product/:id" element={<ProductsDetailPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App

import reactLogo from '../assets/react.svg'
import ProductsList from '../components/ProductsList'
import viteLogo from '/vite.svg'

const ProductsListPage = () => {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <ProductsList />
    </>
  )
}

export default ProductsListPage
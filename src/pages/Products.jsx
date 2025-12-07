import React from 'react'
import ProductHero from '../components/catalogs/header/ProductHero'
import Catalog from '../components/catalogs/catalog/Catalog'

const Products = () => {
  return (
    <div>
      <ProductHero productName="Delicious Chocolate Cake" />
      <Catalog />
    </div>
  )
}

export default Products
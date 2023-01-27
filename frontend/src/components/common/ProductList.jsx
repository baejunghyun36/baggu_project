import React from 'react';
import ProductListItem from './ProductListItem';
function ProductList({ movies }) {
  return (
    <div className="border-t-4">
      {movies.map(movie => (
        <div key={movie.id}>
          <ProductListItem movie={movie} />
        </div>
      ))}
      <hr />
    </div>
  );
}

export default ProductList;

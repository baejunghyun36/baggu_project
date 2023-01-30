import React from 'react';
import { Link } from 'react-router-dom';
function ProductListItem({ movie }) {
  return (
    <Link to={`/item/${movie.id}`}>
      <div
        className="flex flex-col items-center hover:bg-primary-hover"
        // onMouseOver={() => setIsHovering(1)}
        // onMouseOut={() => setIsHovering(0)}
      >
        <img src={movie.medium_cover_image} alt="movie poster" />
        <h2>{movie.title}</h2>
      </div>
    </Link>
  );
}

export default ProductListItem;

import React from 'react';
import { Link } from 'react-router-dom';
// import productItemImg from '../../assets/images/ProductItemImg.png';
function ProductListItem({
  // // api로 받아온 게시글 상세 정보 json파일을 props로 받아와 item.productimg, item.content, item.locate, item.createTime 등으로 사용할 듯함
  // productimg, // 게시글 대표 이미지
  // content, // 게시글 제목
  // item_locate, //게시글 작성 동네
  // item_create_time, //게시글 작성 시간
  // item_trade_state, //바꾸상태
  movie,
}) {
  return (
    // <Link to="/item">
    <Link to={`/item/${movie.id}`}>
      <div className="flex flex-col items-center">
        {/* <img src={productimg} alt="product item img" />
          <span>{content}</span>
          <span>{item_locate}</span>
          <span>{item_create_time}</span> */}
        {/* 바꾸중 버튼 생성 및 삼항연산자 사용하여 바꾸상태 나타내기 */}
        <img src={movie.medium_cover_image} alt="movie poster" />
        <h2>{movie.title}</h2>
      </div>
    </Link>
  );
}

export default ProductListItem;

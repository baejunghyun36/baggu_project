import React from 'react';
import TopBar2 from 'components/common/TopBar2';

function ItemCategory({
  setPage,
  handleItemCategoriesChange,
  handleSelectedCategory,
}) {
  const moveToCreate = ({ type, name }) => {
    handleItemCategoriesChange(type);
    console.log(type, name);
    handleSelectedCategory(name);
    setPage(0);
  };
  return (
    <div>
      <div onClick={() => moveToCreate({ type: 'TYPE0', name: '디지털기기' })}>
        디지털기기
      </div>
      <div onClick={() => moveToCreate({ type: 'TYPE1', name: '생활가전' })}>
        생활가전
      </div>
      <div
        onClick={() => moveToCreate({ type: 'TYPE2', name: '가구/인테리어' })}
      >
        가구/인테리어
      </div>
      <div onClick={() => moveToCreate({ type: 'TYPE3', name: '생활/주방' })}>
        생활/주방
      </div>
      <div onClick={() => moveToCreate({ type: 'TYPE4', name: '여성의류' })}>
        여성의류
      </div>
      <div onClick={() => moveToCreate({ type: 'TYPE5', name: '여성잡화' })}>
        여성잡화
      </div>
      <div
        onClick={() => moveToCreate({ type: 'TYPE6', name: '남성패션/잡화' })}
      >
        남성패션/잡화
      </div>
      <div onClick={() => moveToCreate({ type: 'TYPE7', name: '뷰티/미용' })}>
        뷰티/미용
      </div>
      <div onClick={() => moveToCreate({ type: 'TYPE8', name: '스포츠/레저' })}>
        스포츠/레저
      </div>
      <div
        onClick={() => moveToCreate({ type: 'TYPE9', name: '취미/게임/음반' })}
      >
        취미/게임/음반
      </div>
      <div onClick={() => moveToCreate({ type: 'TYPE10', name: '도서' })}>
        도서
      </div>
      <div onClick={() => moveToCreate({ type: 'TYPE11', name: '가공식품' })}>
        가공식품
      </div>
      <div
        onClick={() => moveToCreate({ type: 'TYPE12', name: '반려동물용품' })}
      >
        반려동물용품
      </div>
      <div onClick={() => moveToCreate({ type: 'TYPE13', name: '기타' })}>
        기타
      </div>
    </div>
  );
}

export default ItemCategory;

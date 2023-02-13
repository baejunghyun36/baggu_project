import React from 'react';
import TopBar2 from 'components/common/TopBar2';

// twin.macro
import tw, { styled, css } from 'twin.macro';

// Styled Component
const ListContainer = styled.div`
  ${css`
    height: calc(100vh - 60px);
  `}
  ${tw`flex-col overflow-scroll overflow-x-hidden`}
`;

const CategoryItem = styled.div`
  ${tw`h-[60px] p-2 border-b hover:bg-primary-hover hover:text-primary`}
  ${props =>
    props.selected ? tw`bg-primary-hover text-primary text-main-bold` : tw``}
`;

// Main Component
function ItemCategory({
  setPage,
  handleItemCategoriesChange,
  handleSelectedCategory,
  selected,
}) {
  const moveToCreate = ({ type, name }) => {
    handleItemCategoriesChange(type);
    console.log(type, name);
    handleSelectedCategory(name);
    setPage(0);
  };

  const CategoryTypes = [
    '디지털기기',
    '생활가전',
    '가구/인테리어',
    '생활/주방',
    '여성의류',
    '여성잡화',
    '남성패션/잡화',
    '뷰티/미용',
    '스포츠/레저',
    '취미/게임/음반',
    '도서',
    '가공식품',
    '반려동물용품',
    '기타',
  ];

  return (
    <ListContainer>
      {CategoryTypes.map((category, idx) => (
        <CategoryItem
          key={idx}
          selected={selected === category}
          onClick={() => moveToCreate({ type: `TYPE${idx}`, name: category })}
        >
          <span>{category}</span>
        </CategoryItem>
      ))}
    </ListContainer>
  );
}

export default ItemCategory;

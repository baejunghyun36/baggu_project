import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TopBar2 from '../../components/common/TopBar2';
import { defaultInstance, authInstance } from 'api/axios';
import requests from 'api/config';
import Preview from './Preview';
import ImageAddButton from './ImageAddButton';
import ItemCategory from './ItemCategory';

// twin.macro
import tw, { styled, css } from 'twin.macro';
import FormSubmitBtn from 'components/common/FormSubmitBtn';
import { post_item } from 'api/apis/item';
import { useNavigate } from 'react-router-dom';

// Styled Component
const FormContainer = styled.div`
  ${tw`flex flex-col p-2`}
`;
const PreviewContainer = styled.div`
  ${tw`flex gap-1`}
`;

const PreviewImg = styled.img`
  ${tw`rounded-lg w-7 h-7`}
`;

const DeleteBtn = styled.div`
  ${tw`fill-primary absolute w-2 h-2 right-[4px] top-[4px]`}
`;

const InputContainer = styled.input`
  ${tw`h-[60px] bg-white outline-none p-1 border-b border-t`}
`;

const TextareaContainer = styled.textarea`
  ${css`
    resize: none;
    height: calc(100vh - 366px);
  `}
  ${tw`bg-white p-1 outline-none`}
`;

const CategoryContainer = styled.div`
  ${tw`h-[60px] flex items-center px-1 text-primary hover:bg-primary-hover`}
`;

// Main Component
function ItemCreate() {
  const [itemTitle, setItemtitle] = useState('');
  const [itemTitleError, setItemTitleError] = useState('');
  const [itemContent, setItemcontent] = useState('');
  const [itemContentError, setItemContentError] = useState('');
  const [itemImage, setItemImage] = useState([]);
  const [itemImageError, setItemImageError] = useState('');
  const [itemCategories, setItemCategories] = useState('');
  const [itemCategoriesError, setItemCategoriesError] = useState('');
  const [token, setToken] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('카테고리 선택');

  // navigate
  const navigate = useNavigate();
  useEffect(() => {}, []);
  // --------------------------------------------------------
  const handleItemImage = event => {
    const files = Array.from(event.target.files);
    setItemImage(prevItemImage => [...prevItemImage, ...files]);
  };
  const moveToCategoryPage = () => {
    setPage(1);
  };
  const handleClickAddImage = () => {
    document.getElementById('imageInput').click();
  };
  const handleDeleteItemImage = index => {
    setItemImage(prevItemImage => prevItemImage.filter((_, i) => i !== index));
  };

  const handleItemTitleChange = event => {
    setItemtitle(event.target.value);
  };
  const handleItemContentChange = event => {
    setItemcontent(event.target.value);
  };
  const handleItemCategoriesChange = value => {
    setItemCategories(value);
  };
  const handleSelectedCategory = name => {
    setSelectedCategory(name);
  };

  // 제출시 실행될 함수
  const handleSubmit = async event => {
    event.preventDefault();
    let hasError = false;
    if (!itemTitle) {
      setItemTitleError('제목을 입력해주세요');
      hasError = true;
    } else {
      setItemTitleError('');
    }
    if (!itemContent) {
      setItemContentError('내용을 입력해주세요');
      hasError = true;
    } else {
      setItemContentError('');
    }
    if (!itemImage) {
      setItemImageError('상품 이미지를 업로드해주세요');
      hasError = true;
    } else {
      setItemImageError('');
    }
    if (!itemCategories) {
      setItemCategoriesError('카테고리를 선택해주세요');
      hasError = true;
    } else {
      setItemCategoriesError('');
    }
    if (!hasError) {
      const data = new FormData();
      data.append('userIdx', localStorage.getItem('userIdx'));
      data.append('title', itemTitle);
      data.append('content', itemContent);
      data.append('category', itemCategories);
      itemImage.forEach((image, index) => {
        data.append('itemImgs', image);
      });
      for (let key of data.keys()) {
        console.log(key);
      }
      for (let value of data.values()) {
        console.log(value);
      }

      // await post_item(data).then(data => {
      //   console.log(data);
      // });
      const post_item_create = async () => {
        try {
          const response = await authInstance.post(requests.POST_ITEM, data, {
            headers: {
              Authorization: localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
            },
          });

          return response.data;
        } catch (error) {
          throw error;
        }
      };

      post_item_create().then(data => {
        navigate(`/item/${data.id}`);
      });
    }
  };
  return (
    <div>
      <div className={`${page === 0 ? '' : 'hidden'}`}>
        <TopBar2 title="게시글 작성" />
      </div>
      <div className={`${page === 1 ? '' : 'hidden'}`}>
        <TopBar2 title="카테고리 선택" BackHandler={() => setPage(0)} />
      </div>
      <div className={`${page === 0 ? '' : 'hidden'}`}>
        <FormContainer>
          <div id="image-area" className="flex gap-1">
            <ImageAddButton clickFunction={handleClickAddImage} />
            {itemImage.map((itemImage, index) => (
              <div key={index} className="relative">
                <DeleteBtn onClick={() => handleDeleteItemImage(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                  </svg>
                </DeleteBtn>
                <PreviewImg
                  src={URL.createObjectURL(itemImage)}
                  alt={itemImage.name}
                />
              </div>
            ))}
          </div>
          <input
            id="imageInput"
            type="file"
            multiple
            accept="img/*"
            onChange={handleItemImage}
            className="display: hidden"
          />
          {itemImageError && (
            <div style={{ color: 'red' }}>{itemImageError}</div>
          )}
          <InputContainer
            type="text"
            placeholder="제목"
            value={itemTitle}
            onChange={handleItemTitleChange}
          />
          {itemTitleError && (
            <div style={{ color: 'red' }}>{itemTitleError}</div>
          )}

          <CategoryContainer onClick={moveToCategoryPage}>
            <span>{selectedCategory}</span>
          </CategoryContainer>
          {itemCategoriesError && (
            <div style={{ color: 'red' }}>{itemCategoriesError}</div>
          )}

          <TextareaContainer
            placeholder="내용"
            value={itemContent}
            onChange={handleItemContentChange}
          />
          {itemContentError && (
            <div style={{ color: 'red' }}>{itemContentError}</div>
          )}
          {/* <button type="submit">Submit</button> */}
        </FormContainer>
        <FormSubmitBtn
          title="작성 완료"
          disabled={!itemContent || !itemImage || !itemCategories}
          onClick={handleSubmit}
        />
      </div>
      <div className={`${page === 1 ? '' : 'hidden'}`}>
        <ItemCategory
          setPage={setPage}
          handleItemCategoriesChange={handleItemCategoriesChange}
          handleSelectedCategory={handleSelectedCategory}
        />
      </div>
    </div>
  );
}

export default ItemCreate;

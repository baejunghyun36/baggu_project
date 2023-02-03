import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TopBar2 from '../../components/common/TopBar2';
import { defaultInstance, authInstance } from 'api/axios';
import requests from 'api/config';
import Preview from './Preview';
import ImageAddButton from './ImageAddButton';
import ItemCategory from './ItemCategory';

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

  useEffect(() => {
    const get_token = async () => {
      try {
        const { data } = await defaultInstance.post(requests.TEST_TOKEN, {
          userIdx: 1,
        });
        setToken(data);
      } catch (error) {
        console.log(error);
      }
    };
    get_token();
  }, []);
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
  const handleSubmit = event => {
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
      data.append('userIdx', '1');
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
      const post_item_create = async () => {
        try {
          const response = await authInstance.post(requests.POST_ITEM, data, {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data',
            },
          });

          return response.data;
        } catch (error) {
          throw error;
        }
      };
      post_item_create();
    }
  };
  return (
    <div>
      <div className={`${page === 0 ? '' : 'hidden'}`}>
        <TopBar2 title="게시글 작성" />
      </div>
      <div className={`${page === 1 ? '' : 'hidden'}`}>
        <TopBar2 title="카테고리 선택" />
      </div>
      <div className={`${page === 0 ? '' : 'hidden'}`}>
        <form onSubmit={handleSubmit}>
          <Preview itemImages={itemImage} onDelete={handleDeleteItemImage} />
          <ImageAddButton clickFunction={handleClickAddImage} />
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
          <input
            type="text"
            placeholder="제목"
            value={itemTitle}
            onChange={handleItemTitleChange}
          />
          {itemTitleError && (
            <div style={{ color: 'red' }}>{itemTitleError}</div>
          )}
          <br />
          <div>
            <span onClick={moveToCategoryPage}>{selectedCategory}</span>
          </div>
          {itemCategoriesError && (
            <div style={{ color: 'red' }}>{itemCategoriesError}</div>
          )}
          <br />
          <input
            type="text"
            placeholder="내용"
            value={itemContent}
            onChange={handleItemContentChange}
          />
          {itemContentError && (
            <div style={{ color: 'red' }}>{itemContentError}</div>
          )}
          <button type="submit">Submit</button>
        </form>
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

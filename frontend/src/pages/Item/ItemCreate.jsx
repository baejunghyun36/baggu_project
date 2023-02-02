import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TopBar2 from '../../components/common/TopBar2';
import { defaultInstance, authInstance } from 'api/axios';
import requests from 'api/config';

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
    setItemImage(Array.from(event.target.files));
  };

  const handleItemTitleChange = event => {
    setItemtitle(event.target.value);
  };
  const handleItemContentChange = event => {
    setItemcontent(event.target.value);
  };
  const handleItemCategoriesChange = event => {
    setItemCategories(event.target.value);
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
      data.append('category', 'TYPE0');
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
      <TopBar2 pageTitle="게시글 작성" />
      <form onSubmit={handleSubmit}>
        <input type="file" multiple accept="img/*" onChange={handleItemImage} />
        {itemImageError && <div style={{ color: 'red' }}>{itemImageError}</div>}
        <input
          type="text"
          placeholder="제목"
          value={itemTitle}
          onChange={handleItemTitleChange}
        />
        {itemTitleError && <div style={{ color: 'red' }}>{itemTitleError}</div>}
        <br />
        <select
          defaultValue="placeholder"
          onChange={handleItemCategoriesChange}
        >
          <option value="placeholder" disabled style={{ display: 'none' }}>
            카테고리 선택
          </option>
          <option value="디지털기기">디지털기기</option>
          <option value="생활가전">생활가전</option>
          <option value="가구/인테리어">가구/인테리어</option>
          <option value="생활/주방">생활/주방</option>
          <option value="유아동">유아동</option>
          <option value="유아도서">유아도서</option>
          <option value="여성의류">여성의류</option>
          <option value="여성잡화">여성잡화</option>
        </select>
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
  );
}

export default ItemCreate;

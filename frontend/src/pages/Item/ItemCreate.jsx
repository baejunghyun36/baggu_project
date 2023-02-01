import React from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import TopBar2 from '../../components/common/TopBar2';
function ItemCreate() {
  const [itemTitle, setItemtitle] = useState('');
  const [itemTitleError, setItemTitleError] = useState('');
  const [itemContent, setItemcontent] = useState('');
  const [itemContentError, setItemContentError] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [itemImageError, setItemImageError] = useState('');
  const [itemCategories, setItemCategories] = useState('');
  const [itemCategoriesError, setItemCategoriesError] = useState('');
  // const []
  const handleItemImage = event => {
    setItemImage(event.target.files);
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
      // Submit the form data to the server or perform other actions
    }
  };

  // const [mutate, { status, error }] = useMutation(async data => {
  //   const response = await axios.post('https://my-api.com/data', data);
  //   return response.data;
  // });

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   mutate({
  //     name: event.target.name.value,
  //     email: event.target.email.value,
  //   });
  // };
  return (
    <div>
      <TopBar2 pageTitle="게시글 작성" />
      {/* <form onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <button type="submit">Submit</button>
        {status === 'loading' && <div>Loading...</div>}
        {status === 'error' && <div>Error: {error.message}</div>}
        {status === 'success' && <div>Success!</div>}
      </form> */}
      <form onSubmit={handleSubmit}>
        <input type="file" accept="img/*" onChange={handleItemImage} />
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

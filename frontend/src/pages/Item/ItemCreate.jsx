import React from 'react';
import { useState } from 'react';
import TopBar2 from '../../components/common/TopBar2';
function ItemCreate() {
  const [files, setFiles] = useState('');
  const onLoadFile = e => {
    const file = e.target.files;
    setFiles(file);
  };
  return (
    <div>
      <TopBar2 pageTitle="게시글 작성" />
      <form action="">
        <input type="file" accept="img/*" onChange={onLoadFile} />
        <input type="text" placeholder="제목" />
        <br />
        <select defaultValue="placeholder">
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
        <br />
        <input type="text" placeholder="내용" />
      </form>
    </div>
  );
}

export default ItemCreate;

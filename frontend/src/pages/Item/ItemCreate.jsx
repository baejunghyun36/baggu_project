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
      </form>
    </div>
  );
}

export default ItemCreate;

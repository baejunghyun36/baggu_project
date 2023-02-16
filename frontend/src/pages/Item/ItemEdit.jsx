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
import { get_item, post_image, post_item, put_item } from 'api/apis/item';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

// Styled Component
const FormContainer = styled.div`
  ${tw`flex flex-col p-2`}
`;
const PreviewContainer = styled.div`
  ${tw`flex gap-1 pb-2`}
`;

const PreviewImg = styled.img`
  ${tw`rounded-lg w-7 h-7 border`}
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
  ${tw`bg-white p-1 py-2 outline-none`}
`;

const CategoryContainer = styled.div`
  ${tw`h-[60px] flex items-center px-1 text-primary hover:bg-primary-hover border-b`}
`;

// Main Component
function ItemEdit() {
  // 제목
  const [itemTitle, setItemtitle] = useState('');
  const [itemTitleError, setItemTitleError] = useState('');
  // 내용
  const [itemContent, setItemcontent] = useState('');
  const [itemContentError, setItemContentError] = useState('');
  // 이미지 목록
  const [itemImage, setItemImage] = useState([]);
  const [itemImageError, setItemImageError] = useState('');
  // 카테고리
  const [itemCategories, setItemCategories] = useState('');
  const [itemCategoriesError, setItemCategoriesError] = useState('');

  // 페이지 (카테고리)
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('카테고리 선택');

  // 해당 페이지의 itemIdx
  const { id } = useParams();
  console.log('id', id);
  const navigate = useNavigate();

  // 해당 페이지의 아이템 GET
  const { data, isLoading } = useQuery(['getItem', { itemIdx: id }], () =>
    get_item(id)
  );

  // itemImage를 서버로 POST 하고 그 URL을 반환
  const getImagePostUrl = async originImg => {
    const { uploadedUrls } = await post_image({ itemImgs: originImg });
    return uploadedUrls[0];
  };

  // 등록된 queryClient
  const queryClient = useQueryClient();

  // 아이템 PUT
  const { mutate, data: put_data } = useMutation(put_item, {
    // 응답 데이터로 해당 쿼리키의 데이터 갈아끼기
    // 해당 아이템 상세페이지로 이동
    onSuccess: data => {
      queryClient.invalidateQueries(['getItem', { itemIdx: id }]);
      navigate(`/item/${id}`);
    },
  });

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

  useEffect(() => {
    if (!isLoading && data) {
      const { category, title, content, itemImgUrls } = data;
      setItemtitle(title);
      setItemcontent(content);
      setItemCategories(`TYPE${category}`);
      setSelectedCategory(CategoryTypes[category]);
      setItemImage(itemImgUrls);
    }
  }, [isLoading, data]);

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
      // itemImage 요소 중 object 타입인 애들 post_image API로 받은 데이터로 교체
      const uploadImgUrls = [];
      for (let image of itemImage) {
        if (image instanceof Blob) {
          uploadImgUrls.push(getImagePostUrl(image));
        } else {
          uploadImgUrls.push(image);
        }
      }
      await Promise.all(uploadImgUrls).then(urls => {
        const resolvedUrls = urls.map(url => {
          if (typeof url === 'object') {
            return url[0];
          } else {
            return url;
          }
        });

        // 바뀐 이미지로 요청 데이터 만들기
        const data = {
          title: itemTitle,
          content: itemContent,
          category: itemCategories,
          uploadImgUrls: resolvedUrls,
          itemFirstImgIdx: 0,
        };
        mutate({ ItemIdx: id, data: data });
      });
      navigate(`/item/${id}`);
      // const response = await put_item(id, data);
    }
  };

  return (
    <div>
      <div className={`${page === 0 ? '' : 'hidden'}`}>
        <TopBar2 title="게시글 수정" />
      </div>
      <div className={`${page === 1 ? '' : 'hidden'}`}>
        <TopBar2 title="카테고리 선택" BackHandler={() => setPage(0)} />
      </div>
      <div className={`${page === 0 ? '' : 'hidden'}`}>
        <FormContainer>
          <PreviewContainer id="image-area" className="flex gap-1">
            <ImageAddButton clickFunction={handleClickAddImage} />
            {itemImage
              ? itemImage.map((itemImage, index) => (
                  <div key={index} className="relative">
                    <DeleteBtn onClick={() => handleDeleteItemImage(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                      </svg>
                    </DeleteBtn>
                    <PreviewImg
                      src={
                        itemImage instanceof Blob
                          ? URL.createObjectURL(itemImage)
                          : itemImage
                      }
                      alt={typeof itemImage}
                    />
                  </div>
                ))
              : ''}
          </PreviewContainer>
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
          selected={selectedCategory}
        />
      </div>
    </div>
  );
}

export default ItemEdit;

import { get_search, post_search } from 'api/apis/search';
import ProductListItem from 'components/common/ProductListItem';
import TopBar2 from 'components/common/TopBar2';
import React, { useState } from 'react';

// twin.macro
import tw, { styled, css } from 'twin.macro';

// Styled Component
const SearchBar = styled.div`
  ${tw`flex justify-center items-center bg-white p-1 border-1 border-primary m-2 rounded-lg`}
`;
const SearchInput = styled.input`
  ${tw`bg-white outline-0`}
  ${css`
    width: calc(100% - 32px);
  `}
`;

const SearchIcon = styled.div`
  ${tw`mr-1`}
`;

const ResultArea = styled.div`
  ${tw`overflow-scroll overflow-x-hidden`}
  ${css`
    height: calc(100vh - 232px);
  `}
`;

// Main Component
const Search = props => {
  // input focus 상태를 나타내는 State
  const [inputFocus, setInputFocus] = useState(false);
  // 검색어 state
  const [searchKey, setSearchKey] = useState('');
  // 검색 결과
  const [searchResult, setSearchResult] = useState([]);

  const onChangeHandler = e => {
    setSearchKey(e.target.value);
  };

  // 검색 API
  const onSubmitHandler = async () => {
    console.log('press enter');
    if (searchKey) {
      const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      searchKey.replace(reg, '');
      const data = { title: searchKey, page: 0 };
      await post_search(data).then(data => setSearchResult(data));
      setSearchKey('');
    }
  };
  /*
  
  */
  return (
    <div>
      <TopBar2 title="검색" />
      <SearchBar>
        <SearchIcon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9766 14.4716H15.1866L14.9066 14.2016C16.1066 12.8016 16.7266 10.8916 16.3866 8.86157C15.9166 6.08157 13.5966 3.86157 10.7966 3.52157C6.56658 3.00157 3.00658 6.56157 3.52658 10.7916C3.86658 13.5916 6.08658 15.9116 8.86658 16.3816C10.8966 16.7216 12.8066 16.1016 14.2066 14.9016L14.4766 15.1816V15.9716L18.7266 20.2216C19.1366 20.6316 19.8066 20.6316 20.2166 20.2216C20.6266 19.8116 20.6266 19.1416 20.2166 18.7316L15.9766 14.4716ZM9.97658 14.4716C7.48658 14.4716 5.47658 12.4616 5.47658 9.97157C5.47658 7.48157 7.48658 5.47157 9.97658 5.47157C12.4666 5.47157 14.4766 7.48157 14.4766 9.97157C14.4766 12.4616 12.4666 14.4716 9.97658 14.4716Z"
              className="fill-primary"
            />
          </svg>
        </SearchIcon>
        <SearchInput
          type="text"
          value={searchKey}
          onChange={onChangeHandler}
          onKeyPress={e => (e.key === 'Enter' ? onSubmitHandler() : '')}
        />
      </SearchBar>
      <ResultArea>
        {searchResult
          ? searchResult.map(item => (
              <ProductListItem key={item.itemIdx} item={item} />
            ))
          : ''}
      </ResultArea>
    </div>
  );
};

export default Search;

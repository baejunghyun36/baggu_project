import React from 'react';

/*

*/

function Example() {
  return (
    <div className="p-2 grid gap-2 h-[680px] overflow-scroll">
      <h2 className="text-secondary underline decoration-primary-light">
        Tailwind 커스텀 속성 사용 예시입니다.
      </h2>
      <h3>Color</h3>
      <h4>main color</h4>
      <div className="flex text-tiny gap-1 flex-wrap">
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-primary">
          <p>primary</p>
        </div>
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-primary-light">
          <p>primary light</p>
        </div>
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-primary-hover">
          <p>primary hover</p>
        </div>
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-secondary">
          <p>secondary</p>
        </div>
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-secondary-light">
          <p>secondary light</p>
        </div>
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-negative">
          <p>negative</p>
        </div>
      </div>
      <h4>black and white</h4>
      <div className="flex text-tiny gap-1 flex-wrap">
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-black text-white">
          <p>black</p>
        </div>
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-white">
          <p>white</p>
        </div>
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-bgColor">
          <p>bgColor</p>
        </div>
      </div>
      <h4>grey scale</h4>
      <div className="flex text-tiny gap-1 flex-wrap">
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-grey1">
          <p>grey1</p>
        </div>
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-grey2">
          <p>grey2</p>
        </div>
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-grey3">
          <p>grey3</p>
        </div>
        <div className="w-20 h-16 flex items-center justify-center text-center rounded bg-grey4 text-white">
          <p>grey4</p>
        </div>
      </div>
      <h3>Typograpy</h3>
      <h4>Headings</h4>
      <div>
        <h1>Heading1</h1>
        <h2>Heading2</h2>
        <h3>Heading3</h3>
        <h4>Heading4</h4>
        <h5>Heading5</h5>
      </div>
      <h4>UI Content</h4>
      <div>
        <p>
          <span className="text-main">Main</span>
          <span className="text-main"> 저랑 물물교환 하실래요?</span>
        </p>
        <p>
          <span className="text-main-bold">Main Bold</span>
          <span className="text-main-bold"> 저랑 물물교환 하실래요?</span>
        </p>
        <p>
          <span className="text-sub">Sub</span>
          <span className="text-sub"> 저랑 물물교환 하실래요?</span>
        </p>
        <p>
          <span className="text-sub-bold">Sub Bold</span>
          <span className="text-sub-bold"> 저랑 물물교환 하실래요?</span>
        </p>
        <p>
          <span className="text-tiny">Tiny</span>
          <span className="text-tiny"> 저랑 물물교환 하실래요?</span>
        </p>
        <p>
          <span className="text-tiny-bold">Tiny Bold</span>
          <span className="text-tiny-bold"> 저랑 물물교환 하실래요?</span>
        </p>
      </div>
    </div>
  );
}

export default Example;

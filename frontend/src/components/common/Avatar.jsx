import React from 'react';
import default_avatar from '../../assets/images/avatar_1x.png';

function Avatar({ img }) {
  img = null;
  const avatar = img ? img : default_avatar;
  return (
    <div className="rounded-full overflow-hidden w-6 h-6 flex object-cover object-center">
      <img src={avatar} alt="" className="w-full h-full" />
    </div>
  );
}

export default Avatar;

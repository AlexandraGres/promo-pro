import './BgImage.scss';

import { FC } from 'react';

const BgImage: FC<{ className: string }> = ({ className }) => {
  return <div className={'bg-image ' + className}></div>;
};

export default BgImage;

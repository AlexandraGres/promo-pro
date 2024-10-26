import './BgImage.scss';

function BgImage({ className }: { className: string }) {
  return <div className={'bg-image ' + className}></div>;
}

export default BgImage;

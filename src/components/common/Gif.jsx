import { useState } from 'react';

const Gif = ({ stillUrl, url, id, title }) => {
  const [play, setPlay] = useState(true);
  const handleToggle = () => {
    setPlay(!play);
  };
  // console.log(title);
  return (
    <div className="gif-container" onClick={handleToggle} key={id}>
      <picture>
        {!play && <source type="image/webp" srcSet={stillUrl} />}
        <img src={url} alt={title} />
      </picture>
    </div>
  );
};

export default Gif;

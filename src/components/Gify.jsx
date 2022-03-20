import { useContext, useRef, useState } from 'react';
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

import Gif from './common/Gif';

import { ThemeSwitch } from './common/ThemeSwitch';
import useImageSearch from 'utils/hooks/useImageSearch';
import useDebounce from 'utils/hooks/useDebounce';
import { scrolledToBottom } from 'utils/helpers/scrolled-to-bottom';
import { ColorModeContext } from 'Context';

const LIMIT = 27;

const Gify = () => {
  const [searhQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const debouncedQuery = useDebounce(searhQuery, 300);
  const matches = useMediaQuery('(max-width:670px)');
  const containerRef = useRef();

  const { imagesData, isLoading, hasMore, error } = useImageSearch({
    debouncedQuery,
    limit: LIMIT,
    offset,
    query: searhQuery,
  });

  const { colorMode, mode } = useContext(ColorModeContext);

  const handleScroll = () => {
    if (isLoading || !hasMore) return;
    if (containerRef.current && scrolledToBottom(containerRef)) {
      setOffset(offset + LIMIT);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setOffset(0);
  };

  return (
    <>
      <header>
        <Typography
          sx={{ fontWeight: 'bold', marginRight: '16px' }}
          variant="h4"
        >
          G
        </Typography>
        <Box sx={{ paddingRight: '10px' }} className="search-container">
          <TextField
            fullWidth
            type="text"
            placeholder="Search Gifs.."
            value={searhQuery}
            onChange={handleChange}
            inputProps={{ style: { padding: 10 } }}
          />
        </Box>
        <ThemeSwitch
          sx={{ marginTop: '2px' }}
          checked={mode === 'dark'}
          onChange={colorMode.toggleColorMode}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </header>

      <Box className="conditional-text">
        <h3>{debouncedQuery.length ? debouncedQuery : 'Trending Gifs'}</h3>
      </Box>
      <Box className="giffyApp" ref={containerRef} onScroll={handleScroll}>
        <Box className="images-container">
          {imagesData.map((imageArray, index) => (
            <Box className="image-column" key={`imageContainer-${index}`}>
              {imageArray.map(({ images, id, title }, index) => (
                <Gif
                  key={`id-${index}`}
                  id={id}
                  title={title}
                  stillUrl={
                    matches
                      ? images.fixed_width_small_still.url
                      : images.fixed_width_still.url
                  }
                  url={
                    matches
                      ? images.fixed_width_small.url
                      : images.fixed_width.url
                  }
                />
              ))}
            </Box>
          ))}
        </Box>
        <Box>
          {!isLoading &&
            !imagesData.length &&
            `No Gifs found for ${debouncedQuery}.`}
        </Box>
        <Box>{isLoading && <CircularProgress />} </Box>
        <Box>{error && 'Error encountered.Please try again.'}</Box>
      </Box>
    </>
  );
};

export default Gify;

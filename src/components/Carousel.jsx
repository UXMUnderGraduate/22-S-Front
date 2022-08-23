import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import BoardItem from './BoardItem';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Carousel = (props) => {
  const TOTAL_SLIDES = 2; // 전체 슬라이드 개수(총3개. 배열로 계산)
  const itemData = props.data;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  // Next 버튼 클릭 시
  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // Prev 버튼 클릭 시
  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  //캐러셀효과
  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <Container>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Typography component="h1" variant="h6" color="white">
          인기차트
        </Typography>
        <Box>
          <IconButton component="label" color="secondary" onClick={PrevSlide}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton component="label" color="secondary" onClick={NextSlide}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
      <SliderContainer ref={slideRef}>
        {itemData.map((item) => {
          return (
            <BoardItem
              key={item.id}
              id={item.id}
              img={item.img}
              songName={item.songName}
              playTime={item.playTime}
              album={item.album}
              artistName={item.artistName}
            />
          );
        })}
      </SliderContainer>
    </Container>
  );
};
export default Carousel;
const Container = styled.div`
  width: 100%;
  margin: auto;
  overflow: hidden;
`;
const SliderContainer = styled.div`
  margin: 0 auto;
  display: flex;
`;

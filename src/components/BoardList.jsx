import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
// import BoardItem from './BoardItem';

const itemData = [
  {
    id: 1,
    img: '/images/test1.png',
    songName: '곡제목1',
    album: '엘범제목1',
    artistName: '생산자1',
    playTime: '재생시간1',
  },
  {
    id: 2,
    img: '/images/test2.png',
    songName: '곡제목2',
    album: '엘범제목2',
    artistName: '생산자2',
    playTime: '재생시간2',
  },
  {
    id: 3,
    img: '/images/test3.png',
    songName: '곡제목3',
    album: '엘범제목3',
    artistName: '생산자3',
    playTime: '재생시간3',
  },
  {
    id: 4,
    img: '/images/test1.png',
    songName: '곡제목4',
    album: '엘범제목4',
    artistName: '생산자4',
    playTime: '재생시간4',
  },
  {
    id: 5,
    img: '/images/test1.png',
    songName: '곡제목5',
    album: '엘범제목5',
    artistName: '생산자5',
    playTime: '재생시간5',
  },
  {
    id: 6,
    img: '/images/test1.png',
    songName: '곡제목6',
    album: '엘범제목6',
    artistName: '생산자6',
    playTime: '재생시간6',
  },
  {
    id: 7,
    img: '/images/test2.png',
    songName: '곡제목7',
    album: '엘범제목7',
    artistName: '생산자7',
    playTime: '재생시간7',
  },
  {
    id: 8,
    img: '/images/test3.png',
    songName: '곡제목8',
    album: '엘범제목8',
    artistName: '생산자8',
    playTime: '재생시간8',
  },
  {
    id: 9,
    img: '/images/test1.png',
    songName: '곡제목9',
    album: '엘범제목9',
    artistName: '생산자9',
    playTime: '재생시간9',
  },
  {
    id: 10,
    img: '/images/test1.png',
    songName: '곡제목10',
    album: '엘범제목10',
    artistName: '생산자10',
    playTime: '재생시간10',
  },
  {
    id: 11,
    img: '/images/test1.png',
    songName: '곡제목11',
    album: '엘범제목11',
    artistName: '생산자11',
    playTime: '재생시간11',
  },
  {
    id: 12,
    img: '/images/test2.png',
    songName: '곡제목12',
    album: '엘범제목12',
    artistName: '생산자12',
    playTime: '재생시간12',
  },
  {
    id: 13,
    img: '/images/test3.png',
    songName: '곡제목13',
    album: '엘범제목13',
    artistName: '생산자13',
    playTime: '재생시간13',
  },
  {
    id: 14,
    img: '/images/test1.png',
    songName: '곡제목14',
    album: '엘범제목14',
    artistName: '생산자14',
    playTime: '재생시간14',
  },
  {
    id: 15,
    img: '/images/test1.png',
    songName: '곡제목15',
    album: '엘범제목15',
    artistName: '생산자15',
    playTime: '재생시간15',
  },
];

const onInitialized = (e) => {
  console.debug(`Start position(activeIndex) on init: ${e.item}. Event:`, e);
};

const onSlideChange = (e) => {
  console.debug(`Item's position before a change: ${e.item}. Event:`, e);
};

const onSlideChanged = (e) => {
  console.debug(`Item's position after changes: ${e.item}. Event:`, e);
};

const onResized = (e) => {
  console.debug(`Item's position after resize: ${e.item}. Event:`, e);
};

export default function Carousel() {
  const items = itemData.map((item) => (
    // eslint-disable-next-line react/jsx-key
    <div className={item.songName} data-value={item.id} style={{ width: '25vw' }}>
      <img src={item.img} />
      <p>{item.songName}</p>
    </div>
  ));

  return (
    <AliceCarousel
      disableDotsControls
      autoWidth={true}
      infinite={true}
      mouseTracking
      keyboardNavigation
      items={items}
      onInitialized={onInitialized}
      onSlideChange={onSlideChange}
      onSlideChanged={onSlideChanged}
      onResized={onResized}
    />
  );
}

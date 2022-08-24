// import { DataGrid } from '@mui/x-data-grid';
import { Container, Box } from '@mui/material';
import styled from 'styled-components';
import ListItem from './ListItem';
const Tpbox = styled.div`
  font-weight: bold;
  text-align: center;
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
`;

const BoardGrid = (props) => {
  const itemData = props.data;
  return (
    <Container sx={{ width: '100vw}' }}>
      <Tpbox>
        <Box sx={{ display: 'flex', paddingTop: '1%', textAlign: 'center', margin: '1%' }}>
          <Box sx={{ width: '33%' }}>곡명</Box>
          <Box sx={{ width: '33%' }}>아티스트</Box>
          <Box sx={{ width: '33%' }}>엘범명</Box>
        </Box>
        {itemData.map((item) => {
          return (
            <ListItem
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
      </Tpbox>
    </Container>
  );
};
export default BoardGrid;

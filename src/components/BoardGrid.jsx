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
  const itemData = [...props.data];
  return (
    <Container sx={{ width: '100vw}' }}>
      <Tpbox>
        <Box sx={{ display: 'flex', paddingTop: '1%', textAlign: 'center', margin: '1%' }}>
          <Box sx={{ width: '33%' }}>곡명</Box>
          <Box sx={{ width: '33%' }}>아티스트</Box>
          <Box sx={{ width: '33%' }}>장르</Box>
        </Box>
        {itemData.map((item, index) => {
          return (
            <ListItem
              key={index}
              id={item.id}
              img={item.img}
              title={item.title}
              genre={item.genre}
              artist={item.artist}
              user_id={item.user_id}
            >
              {console.log(item)}
            </ListItem>
          );
        })}
      </Tpbox>
    </Container>
  );
};
export default BoardGrid;

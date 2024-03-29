// import { DataGrid } from '@mui/x-data-grid';
import { Container, Box } from '@mui/material';
import styled from 'styled-components';
import ListItem from './ListItem';
const Tpbox = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  text-align: center;
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.4);
  padding-bottom: 1rem;
  border-radius: 0.3rem;
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
              pageState={'Board'}
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

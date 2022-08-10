import { Container, Box } from '@mui/material';
import * as React from 'react';
import BoardList from '../components/BoardList';

const Board = () => {
  return (
    <Box>
      <Container sx={{ height: '110vh', mt: 2, display: 'flex' }}>
        <BoardList />
      </Container>
    </Box>
  );
};
export default Board;

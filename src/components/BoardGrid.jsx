import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import styled from 'styled-components';

const Tpbox = styled.div`
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
  margin-top: 5%;
`;

const BoardGrid = (props) => {
  const itemData = props.data;
  const columns = [
    {
      field: 'songName',
      headerName: '곡명',
      width: 200,
      editable: false,
    },
    {
      field: 'artistName',
      headerName: '아티스트명',
      sortable: false,
      width: 200,
      editable: false,
    },
    {
      field: 'album',
      headerName: '앨범명',
      sortable: false,
      width: 200,
      editable: false,
    },
    {
      field: 'playTime',
      headerName: 'Play Time',
      sortable: false,
      width: 200,
      editable: false,
    },
  ];
  return (
    <Container sx={{ width: '100vw}', }}>
      <Tpbox>
        <DataGrid
          sx={{ color: 'white' }}
          rows={itemData}
          columns={columns}
          autoHeight
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
        />
      </Tpbox>
    </Container>
  );
};
export default BoardGrid;

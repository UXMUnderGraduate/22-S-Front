import { Container } from '@mui/material';
import Carousel from './Carousel';
// import PropTypes from 'prop-types';

// BoardList.propsTypes = {
//   props: PropTypes.node.isRequired,
// };

const BoardList2 = (props) => {
  console.log(props.data);
  return (
    <Container sx={{ paddingTop: '2%' }}>
      <Carousel data={props.data} />
    </Container>
  );
};
export default BoardList2;

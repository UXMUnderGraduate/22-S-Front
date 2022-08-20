import { Card, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
// import PropTypes from 'prop-types';

const BoardItem = (props) => {
  // BoardItem.prototype = {
  //   props: PropTypes.node,
  // };
  return (
    <Box>
      <Card variant="div" sx={{ display: 'inline-block' }}>
        <CardActionArea>
          <CardMedia
            sx={{ width: '190px', height: '190px' }}
            component="img"
            image={props.img}
            alt="이미지 왜 안나와.."
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {props.album}
            </Typography>
            <Typography color="text.secondary">{props.artistName}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
export default BoardItem;

import { Card, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BoardItem = (props) => {
  const Navigate = useNavigate();

  return (
    <Box
      onClick={() =>
        Navigate(`/board/${props.id}`, {
          state: {
            id: props.id,
            title: props.title,
            img: props.img,
            artist: props.artist,
          },
        })
      }
    >
      <Card variant="div" sx={{ display: 'inline-block' }}>
        <CardActionArea>
          <CardMedia
            sx={{ width: '190px', height: '190px', backgroundImage: `url('data:image/jpeg;base64,${props.image}')` }}
            component="img"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {props.title}
            </Typography>
            <Typography color="text.secondary">{props.artist}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
export default BoardItem;

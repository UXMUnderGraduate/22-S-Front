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
      <Card variant="div" sx={{ display: 'inline-block', width: '12rem', height: '17rem', m: 0.5 }}>
        <CardActionArea>
          <CardMedia
            sx={{ width: '12rem', height: '12rem', backgroundImage: `url('data:image/jpeg;base64,${props.image}')` }}
            component="img"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontSize: '1.1rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace:'nowrap' }}
            >
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

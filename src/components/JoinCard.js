import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
},
cover: {
    width: 151,
    borderLeft: "solid rgba(0, 0, 0, 0.3) 1px"
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function JoinCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.hostName}
          </Typography>
          <h3 className="NanumGothic3">
            {props.hostName}님의 방에 입장합니다
          </h3>
        </CardContent>
          <IconButton onClick={() => props.setJoin(1)} aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
      </div>
      <CardMedia
        className={classes.cover}
        image={props.imageLink}
        title="Live from space album cover"
      />
    </Card>
  );
}
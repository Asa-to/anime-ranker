import { Card, CardActionArea, CardContent, CardHeader, CardMedia, createStyles, Link, makeStyles, Typography } from '@material-ui/core';
import { Twitter } from '@material-ui/icons';
import React, { FC } from 'react';

import { Anime } from '../types';

const useStyles = makeStyles(
  createStyles({
    root: {
      width: '300px',
      height: '410px',
      padding: '5px',
      marginBottom: '5px',
    },
    media: {
      height: '290px',
      width: '290px',
      padding: 'auto',
    },
    title: {
      position: 'relative',
      lineHeight: '24px',
      top: '-16px',
      height: '70px',
      fontSize: '20px',
    },
    icon: {
      position: 'relative',
      top: '-15px',
      height: '30px',
      width: '30px',
    },
    follower: {
      position: 'relative',
      top: '-38px',
      left: '35px',
    },
  })
);

const AnimeCard: FC<{anime: Anime}> = ({ anime }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={anime.public_url} target='_blank'>
        <CardMedia className={classes.media} image={anime.iconURL} />
      </CardActionArea>
      <CardContent>
        <Typography className={classes.title}>
          {anime.title}
        </Typography>
        <Link href={anime.twitter_url} underline='none' color='textPrimary' target='_blank'>
          <Twitter className={classes.icon} color='primary' />
          <Typography className={classes.follower}>
            {`フォロワー数：${anime.follower}`}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  )
}

export default AnimeCard;
import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';

import { Anime } from '../types';

const AnimeCard: FC<{anime: Anime}> = ({ anime }) => {

  const style: React.CSSProperties = {
    width: '300px'
  }

  return (
    <Card style={style}>
      <Card.Img variant='top' src='https://pbs.twimg.com/profile_images/1242713073732874241/VdHanJil_400x400.jpg'/>
      <Card.Title>{anime.title}</Card.Title>
      <Card.Text>フォロワー数： {anime.follower}</Card.Text>
      <Button variant="outline-primary" href={anime.twitter_url}>Go twitter</Button>
    </Card>
  )
}

export default AnimeCard;
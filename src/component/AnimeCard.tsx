import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';

import { Anime } from '../types';

const AnimeCard: FC<{anime: Anime}> = ({ anime }) => {

  const cardStyle: React.CSSProperties = {
    width: '300px',
    height: '430px',
    padding: '5px',
  }

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
  }

  const textStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '30px',
  }

  return (
    <Card style={cardStyle}>
      <Card.Img variant='top' src='https://pbs.twimg.com/profile_images/1242713073732874241/VdHanJil_400x400.jpg'/>
      <Card.Title>{anime.title}</Card.Title>
      <Card.Text style={textStyle}>フォロワー数： {anime.follower}</Card.Text>
      <Button variant="outline-primary" style={buttonStyle} href={anime.twitter_url}>Go Twitter</Button>
    </Card>
  )
}

export default AnimeCard;
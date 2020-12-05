import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';

import { Anime } from '../types';

const AnimeCard: FC<{anime: Anime}> = ({ anime }) => {

  const cardStyle: React.CSSProperties = {
    width: '300px',
    height: '430px',
    padding: '5px',
    margin: 'auto',
  }

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
  }

  const textStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '25px',
  }
  return (
    <Card style={cardStyle} className='shadow-sm my-1'>
      <Card.Img variant='top' src={anime.iconURL} />
      <Card.Title>{anime.title}</Card.Title>
      <Card.Text style={textStyle}>フォロワー数： {anime.follower}</Card.Text>
      <Button variant="outline-primary" style={buttonStyle} target='_blank' href={anime.twitter_url}>Go Twitter</Button>
    </Card>
  )
}

export default AnimeCard;
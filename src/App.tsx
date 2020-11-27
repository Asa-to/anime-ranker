import React, { FC } from 'react'; 
import useAnimes from './hooks/useAnimes';
import 'bootstrap/dist/css/bootstrap.min.css';

import AnimeCard from './component/AnimeCard';
import { ListGroup } from 'react-bootstrap';

const App: FC = () => {
  const {animes} = useAnimes();

  return (
    <ListGroup>
      {animes.map((anime) => 
        <ListGroup.Item key={anime.id}>
          <AnimeCard anime={anime} />
        </ListGroup.Item>
      )}
    </ListGroup>
  )
}

export default App;
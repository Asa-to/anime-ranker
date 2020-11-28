import React, { FC, useState } from 'react'; 
import useAnimes from './hooks/useAnimes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';

import AnimeCard from './component/AnimeCard';
import MyHeader from './component/MyHeader';
import MyForms from './component/MyForms';

const App: FC = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [season, setSeason] = useState(1);
  const {animes} = useAnimes(year, season);

  const style:React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  }

  return (
    <>
      <MyHeader />
      <MyForms setYear={setYear} setSeason={setSeason}/>
      <ListGroup style={style}>
        {animes.map((anime) => 
          <AnimeCard key={anime.id} anime={anime} />
        )}
      </ListGroup>
    </>
  )
}

export default App;
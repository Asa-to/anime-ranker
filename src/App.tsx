import React, { FC, useState } from 'react'; 
import useAnimes from './hooks/useAnimes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';

import AnimeCard from './component/AnimeCard';
import MyHeader from './component/MyHeader';
import MyForms from './component/MyForms';
import NoData from './component/NoData';

const App: FC = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [season, setSeason] = useState(1);
  const {animes} = useAnimes(year, season);

  const style:React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }

  return (
    <>
      <MyHeader />
      <MyForms setYear={setYear} setSeason={setSeason}/>
      <ListGroup style={style}>
        {animes.length ? animes.map((anime) => 
          <AnimeCard key={anime.id} anime={anime} />
        ) : <NoData />}
      </ListGroup>
    </>
  )
}

export default App;
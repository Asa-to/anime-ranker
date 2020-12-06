import React, { FC, useState } from 'react'; 
import useAnimes from './hooks/useAnimes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

import AnimeCard from './component/AnimeCard';
import MyHeader from './component/MyHeader';
import MyForms from './component/MyForms';
import NoData from './component/NoData';

const App: FC = () => {
  const [cookies, setCookie] = useCookies(['year', 'season']);
  const [year, setYear] = useState(cookies.year || new Date().getFullYear());
  const [season, setSeason] = useState(cookies.season || 1);
  const {animes, loading} = useAnimes(year, season);

  setCookie('year', year);
  setCookie('season', season);

  const style:React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }

  return (
    <>
      <MyHeader />
      <MyForms setYear={setYear} setSeason={setSeason} year={year} season={season} />
      <ListGroup style={style}>
        {animes.length || loading ? animes.map((anime) => 
          <AnimeCard key={anime.id} anime={anime} />
        ) : <NoData />}
      </ListGroup>
    </>
  )
}

export default App;
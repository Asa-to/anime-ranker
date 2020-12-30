import React, { FC, useState } from 'react'; 
import useAnimes from './hooks/useAnimes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

import AnimeCard from './component/AnimeCard';
import MyHeader from './materialComponent/MyHeader';
import MyForms from './component/MyForms';
import NoData from './materialComponent/NoData';

const App: FC = () => {
  const [cookies, setCookie] = useCookies(['year', 'season']);
  const [year, setYear] = useState(cookies.year || new Date().getFullYear());
  const [season, setSeason] = useState(cookies.season || 1);
  const {animes, loading, isInited} = useAnimes(year, season);

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
        { 
          isInited && animes.length === 0 ? 
            <NoData /> :
            animes.map((anime) => <AnimeCard key={anime.id} anime={anime} />)
        }
      </ListGroup>
    </>
  )
}

export default App;
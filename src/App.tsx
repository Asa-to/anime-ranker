import React, { FC, useState } from 'react'; 
import useAnimes from './hooks/useAnimes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

import AnimeCard from './materialComponent/AnimeCard';
import MyHeader from './materialComponent/MyHeader';
import MyForms from './materialComponent/MyForms';
import NoData from './materialComponent/NoData';
import BackdropCercular from './materialComponent/BackdropCercular';

const App: FC = () => {
  const [cookies, setCookie] = useCookies(['year', 'season']);
  const [year, setYear] = useState(cookies.year ?? new Date().getFullYear());
  const [season, setSeason] = useState(cookies.season ?? 1);
  console.log(year, 'year ', cookies.year, 'cookie');
  const {animes, isLoading, isInited} = useAnimes(year, season);

  setCookie('year', year, { path: '/'});
  setCookie('season', season, { path: '/'});

  const style:React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }

  return (
    <>
      <BackdropCercular open={isLoading} />
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
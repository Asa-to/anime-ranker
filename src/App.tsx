import React, { FC } from 'react'; 
import useAnimes from './hooks/useAnimes';

const App: FC = () => {
  const {animes, loading} = useAnimes();

  console.log(animes);
  return (
    <div>
      {animes.map((anime) => {
        return <p>title: {anime.title} twitter: {anime.twitter_account} </p>
      })}
    </div>
  )
}

export default App;
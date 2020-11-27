import { useEffect, useState } from 'react';
import axios from 'axios';

import {Anime} from '../types';

const useAnimes = (year = 2020, season = 1) => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  const URL = `https://api.moemoe.tokyo/anime/v1/master/${year}/${season}`;
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const result = await axios(URL);
      const animeList: Anime[] = [];
      for(const anime of result.data) {
          const {id, title, twitter_account} = anime;
          animeList.push({id, title, twitter_account}); 
      }

      setAnimes(animeList);
      setLoading(false);
    }

    load();
  }, [URL])
  return {animes, loading};
}

export default useAnimes;
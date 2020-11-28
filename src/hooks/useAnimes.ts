import { useEffect, useState } from 'react';
import axios from 'axios';

import {Anime} from '../types';

const useAnimes = (year = new Date().getFullYear(), season = 1) => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  const animeURL = `https://api.moemoe.tokyo/anime/v1/master/${year}/${season}`;
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      let twitterURL = `https://api.moemoe.tokyo/anime/v1/twitter/follower/status?accounts=`;
      const animeList: Anime[] = [];
      {
        const result = await axios(animeURL);
        for(const anime of result.data) {
            const {id, title, twitter_account} = anime;
            twitterURL += (twitter_account + ',');
            animeList.push({id, title, twitter_account, twitter_url: 'https://twitter.com/' + twitter_account, follower: NaN}); 
        }
      }
      const result = await axios(twitterURL);
      for(const title of Object.keys(result.data)) {
        const index = animeList.findIndex((anime) => anime.twitter_account === title);
        animeList[index].follower = result.data[title].follower;
      }

      animeList.sort((first, second) => first.follower < second.follower ? 1 : -1);
      setAnimes(animeList);
      setLoading(false);
    }

    load();
  }, [animeURL])
  return {animes, loading};
}

export default useAnimes;
import { useEffect, useState } from 'react';
import axios from 'axios';

import {Anime} from '../types';

const useAnimes = (year = new Date().getFullYear(), season = 1) => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  const animeURL = `https://api.moemoe.tokyo/anime/v1/master/${year}/${season}`;
  useEffect(() => {
    setLoading(true);
    const load = async () => {
      const animeList: Anime[] = [];
      const users: string[] = [];
      // アニメの情報をapiから引っ張ってくる
      const result = await axios(animeURL);
      // twitter情報だけを抜き出して他はanimeListにマージ
      for(const anime of result.data) {
          const {id, title, twitter_account} = anime;
          users.push(twitter_account);
          animeList.push({id, title, twitter_account, twitter_url: `https://twitter.com/${twitter_account}`, follower: NaN, iconURL: ''}); 
      }
      // アニメのtwitterのフォロワー数とアイコンを取得する
      const twitter_result = await axios(`https://asia-northeast1-anime-ranker.cloudfunctions.net/twitter_user_data_list?accounts=${users.join(',')}`);
      // 取得したデータをanimeListにマージ
      for(const twitter of twitter_result.data.user_data_list) {
        const {screen_name, icon_url, followers} = twitter;
        const index = animeList.findIndex((anime) => anime.twitter_account === screen_name);
        if(index !== -1)animeList[index].iconURL = icon_url;
        if(index !== -1)animeList[index].follower = followers;
      }
      // アニメデータをフォロワー順にソートする。ついでにtwitterにデータがないアカウントを除く
      animeList.sort((first, second) => first.follower < second.follower ? 1 : -1);
      setAnimes(animeList.filter((anime) => 1000 < anime.follower && anime.iconURL));
      setLoading(false);
    }

    load();
  }, [animeURL])
  return {animes, loading};
}

export default useAnimes;
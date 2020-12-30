import { useEffect, useState } from 'react';
import axios from 'axios';

import {Anime} from '../types';

const getAnimes = async (url: string) => {
  const animeList: Anime[] = [];
  const users: string[] = [];
  const result = await axios(url);
  // twitter情報だけを抜き出して他はanimeListにマージ
  for(const anime of result.data) {
      const {id, title, twitter_account, public_url} = anime;
      users.push(twitter_account);
      animeList.push({id, title, twitter_account, twitter_url: `https://twitter.com/${twitter_account}`, public_url, follower: NaN, iconURL: ''}); 
  }

  return { animeList, users };
}

const mergeTwitterData = async (animeList: Anime[], users: string[]) => {
  const url = `https://asia-northeast1-anime-ranker.cloudfunctions.net/twitter_user_data_list?accounts=${users.join(',')}`;
  const twitter_result = await axios(url);
  // 取得したデータをanimeListにマージ
  for(const twitter of twitter_result.data.user_data_list) {
    const {screen_name, icon_url, followers} = twitter;
    const index = animeList.findIndex((anime) => anime.twitter_account === screen_name);
    if(index !== -1)animeList[index].iconURL = icon_url;
    if(index !== -1)animeList[index].follower = followers;
  }

  return animeList;
}

const useAnimes = (year = new Date().getFullYear(), season = 1) => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInited, setIsInited] = useState(false);
  const animeURL = `https://api.moemoe.tokyo/anime/v1/master/${year}/${season}`;

  useEffect(() => {
    setIsLoading(true);
    const load = async () => {
      // アニメの情報をapiから引っ張ってくる
      const { animeList, users } = await getAnimes(animeURL);
      if(users.length){
        // アニメのtwitterのフォロワー数とアイコンを取得する
        await mergeTwitterData(animeList, users);
        // アニメデータをフォロワー順にソートする。ついでにtwitterにデータがないアカウントを除く
        animeList.sort((first, second) => first.follower < second.follower ? 1 : -1);
      }
      setAnimes(animeList.filter((anime) => 1000 < anime.follower && anime.iconURL));
      setIsLoading(false);
      setIsInited(true);
    }

    load();
  }, [animeURL])

  return {animes, isLoading, isInited};
}

export default useAnimes;
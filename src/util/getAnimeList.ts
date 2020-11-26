import axios from 'axios';
import { Anime } from './../types';

type GetAnimeList = {
    (year: number, season: number): Anime[];
}

const getAnimeList: GetAnimeList = (year, season) => {
    const URL = `https://api.moemoe.tokyo/anime/v1/master/${year}/${season}`;
    let solve: Anime[] = [];
    
    const load = async () => {
        await axios({
            method: 'GET',
            url: URL,
            responseType: 'json'
        })
            .then((result) => {
                const animeList: Anime[] = [];
                for(const anime of result.data) {
                    const {id, title, twitter_account} = anime;
                    animeList.push({id, title, twitter_account}); 
                }
                solve = animeList.slice(0, animeList.length);
                console.log(solve, solve[0]);
            })
            .catch((err) => {
                console.log(err.status);
            });
    }
    load();

    // console.log(solve[0]);
    return solve;
}

export default getAnimeList;
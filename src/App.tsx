import React, { FC } from 'react';

import getAnimeList from './util/getAnimeList';
import { Anime } from './types';

const App: FC = () => {
    const animeList: Anime[] = getAnimeList(2020, 3);
    console.log(animeList);

    return (
        <div>
        </div>
    )
}

export default App;
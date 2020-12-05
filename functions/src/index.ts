import * as functions from 'firebase-functions';
import axios from 'axios';
import * as corsLib from 'cors';
const cors = corsLib();

type UserDataList = {
  screen_name: string,
  icon_url: string,
  followers: number,
}

export const twitter_user_data_list = functions
  .region('asia-northeast1')
  .https.onRequest((req, res) => {
    return cors(req, res, () => {
      // GET以外は許さない
      if(req.method !== 'GET'){
        res.status(401).send({
          message: 'Not allowed'
        });
      }
      console.log(`req.query.accounts = ${req.query.accounts}`);
      axios(`https://api.twitter.com/1.1/users/lookup.json?screen_name=${req.query.accounts}`, {
          headers: {
            'authorization': `Bearer ${functions.config().twitter.bearer}`
          }
        })
        .then((result) => {
          const userDataList: UserDataList[] = [];
          for(const account of result.data) {
            const temp = {
              screen_name: account.screen_name,
              icon_url: account.profile_image_url_https.replace('_normal', ''),
              followers: account.followers_count,
            } 
            userDataList.push(temp);
          }
          res.status(200).send({ user_data_list: userDataList });
        })
        .catch((error) => {
          res.status(500).send({ error })
        })
      });
    });
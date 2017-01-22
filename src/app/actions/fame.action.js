import { createAction } from 'redux-actions';
import { parseJSON, data, getJson, postJson, body } from './util';
import fetch from 'isomorphic-fetch';
import util from './util';
import store from 'store';


const momentUserStaticData = {
  pageNum: 1,
  pageCount: 1,
  data: [
    {name:'user_pubsub_album'},
    {name:'pubsub_test'},
    {name:'pubsub'},
    {name:'user_pubsub_album_test'},
  ]
}
export 
const listMomentUser = createAction('moment-user', (args, cb) =>  {
  cb && cb();
  return momentUserStaticData;
});
 
import {handleActions} from 'redux-actions';

const init = {
  momentList: null,
};

export default handleActions({
  'moment-user': (state, {payload}) => ({
    ...state,
    momentList: payload,
  }),
}, init);

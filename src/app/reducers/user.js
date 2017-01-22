import {handleActions} from 'redux-actions';

const init = {
  user: {},
};

export default handleActions({
  'login user': (state, {payload}) => ({
    ...state,
    user: payload,
  }),
}, init);

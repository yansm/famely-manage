import promise from 'redux-promise';
import { applyMiddleware, createStore } from 'redux';
import reducers from 'reducers';

export default () => {
	const createStoreWithMiddleware = applyMiddleware(
    promise,
  )(createStore);

	return createStoreWithMiddleware(reducers);
}

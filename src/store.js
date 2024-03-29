import { createStore, applyMiddleware, Compose, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const initialState = {};
const middleware = [thunk];
const store = createStore(
    rootReducer, initialState,compose(
     applyMiddleware(...middleware)
    )
)
export default store;
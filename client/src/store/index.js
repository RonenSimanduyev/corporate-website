import { createStore } from 'redux';
import rootReducer from './reducers';
// redux toolkit was not demanded so i used a depracatod method
const store = createStore(rootReducer);

export default store;

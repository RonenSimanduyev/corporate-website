import { combineReducers } from 'redux';
import photosReducer from './photos';
import filtersReducer from './filtersSlice';

const rootReducer = combineReducers({
    photos: photosReducer,
    filters: filtersReducer,
});

export default rootReducer;

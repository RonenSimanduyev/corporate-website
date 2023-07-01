const initialState = {
    photos: [],
};

const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PHOTOS':
            return {
                ...state,
                photos: action.payload,
            };
        default:
            return state;
    }
};

export default photosReducer;

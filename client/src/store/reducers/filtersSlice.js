import { createSlice } from '@reduxjs/toolkit';
import { categories } from '@/constants';

const initialState = {
    category: categories[0],
    sortByDate: false,
    currentPage: 1,
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSortByDate: (state, action) => {
            state.sortByDate = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setCategory, setSortByDate, setCurrentPage } = filtersSlice.actions;

export default filtersSlice.reducer;
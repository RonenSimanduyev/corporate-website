import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '@/store/reducers/filtersSlice';

export const Pagination = () => {
    const dispatch = useDispatch();
    const { currentPage, category } = useSelector((state) => state.filters);

    const handlePrev = async () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            const response = await fetch(
                `http://localhost:4000/photos?category=${category}&page=${newPage}`
            );
            const data = await response.json();
            dispatch({ type: 'FETCH_PHOTOS', payload: data });
            dispatch(setCurrentPage(newPage));
        }
    };

    const handleNext = async () => {
        const newPage = currentPage + 1;
        const response = await fetch(
            `http://localhost:4000/photos?category=${category}&page=${newPage}`
        );
        const data = await response.json();
        dispatch({ type: 'FETCH_PHOTOS', payload: data });
        dispatch(setCurrentPage(newPage));
    };

    return (
        <div className="h-[180px] text-center">
            <button
                className="items-center justify-center text-4xl m-2 rounded-2xl p-3 bg-[#ff9900]"
                onClick={handlePrev}
            >
                prev
            </button>
            <span className="items-center justify-center text-4xl m-2 rounded-2xl py-3 px-5 bg-[#ff9900]">
        {currentPage}
      </span>
            <button
                className="items-center justify-center text-4xl m-2 rounded-2xl p-3 bg-[#ff9900]"
                onClick={handleNext}
            >
                next
            </button>
        </div>
    );
};

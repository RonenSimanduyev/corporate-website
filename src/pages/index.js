import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';



const HomePage = () => {
    const [currentPage , setCurrentPage] =useState(1)
    const [category , setCategory] =useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handlePrev = () => {
        // Logic to fetch and update previous 9 items
    };

    const handleNext = () => {
        // Logic to fetch and update next 9 items
    };

    const dispatch = useDispatch();
    const photos = useSelector((state) => state.photos.photos);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=spo`
            );
            const data = await response.json();
            dispatch({ type: 'FETCH_PHOTOS', payload: data.hits.slice(0, 9) });
        };

        fetchData();
    }, []);

    return (
        <div>


            <div className="grid grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="m-5 flex items-center justify-center">
                        <img className="max-w-full max-h-full" src={photo.largeImageURL} alt={photo.title} />
                    </div>
                ))}
            </div>
            <div className="h-[180px] text-center sticky">
                <button className=" items-center justify-center text-4xl m-2 rounded-2xl p-3 bg-[#ff9900]" onClick={handlePrev}>
                    prev
                </button>
                <span className=" items-center justify-center text-4xl m-2 rounded-2xl py-3 px-5 bg-[#ff9900]">{currentPage}</span>
                <button className=" items-center justify-center text-4xl m-2 rounded-2xl p-3 bg-[#ff9900]" onClick={handleNext}>
                    next
                </button>
            </div>
        </div>
    );
};

export default HomePage;

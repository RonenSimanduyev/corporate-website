import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { TypeSelectionModal } from '@/components/TypeSelectionModal';
import { Pagination } from '@/components/Pagination';
import { categories } from '@/constants';
import { setSortByDate } from '@/store/reducers/filtersSlice';
import { setCurrentPage } from '@/store/reducers/filtersSlice';


const HomePage = () => {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { category, sortByDate, currentPage } = useSelector((state) => state.filters);

    const toggleSortByDate = () => {
        dispatch(setSortByDate(!sortByDate));
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleCategorySelect = () => {
        handleModalClose();
    };

    const photos = useSelector((state) => state.photos);

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `http://localhost:4000/photos?category=${category}&sortByDate=${sortByDate ? 'true' : ''}`
            );
            const data = await response.json();
            dispatch({ type: 'FETCH_PHOTOS', payload: data });
            dispatch(setCurrentPage(1));
        };


        fetchData();
    }, [category, dispatch, sortByDate]);

    return (
        <div>
            <div className="items-center justify-center text-center">
                <button
                    className="items-center justify-center text-4xl m-2 rounded-2xl w-30 p-3 bg-[#ff9900]"
                    onClick={handleModalOpen}
                >
                    Select Category
                </button>
            </div>
            <TypeSelectionModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSelectCategory={handleCategorySelect}
                toggleSortByDate={toggleSortByDate}
            />

            <div className="text-white text-4xl text-center mt-8 mb-4">
                <div>
                    <h1>Category - {category}</h1>

                    <div className="grid grid-cols-3 gap-4">
                        {photos.map((photo) => (
                            <div key={photo.id} className="m-5 flex items-center justify-center">
                                <img
                                    className="max-w-full max-h-full cursor-pointer"
                                    src={photo.largeImageURL}
                                    alt={photo.title}
                                    onClick={() => handleImageSelect(photo)}
                                />
                            </div>
                        ))}
                    </div>
                    <Pagination />
                        <ReactModal
                            isOpen={selectedImage !== null}
                            onRequestClose={() => setSelectedImage(null)}
                            contentLabel="Image Details Modal"
                        >
                            {selectedImage && (
                                <div>
                                    <h2>Image Details</h2>
                                    <img
                                        className="w-[80vw] h-[30vw] items-center m-auto"
                                        src={selectedImage.largeImageURL}
                                        alt={selectedImage.title}
                                    />
                                    <div className="text-black flex items-center text-center justify-center">
                                        <p className="m-3 border-2 border-black p-1 ">Views: {selectedImage.views}</p>
                                        <p  className="m-3 border-2 border-black p-1 ">Downloads: {selectedImage.downloads}</p>
                                        <p className="m-3 border-2 border-black p-1 ">Likes: {selectedImage.likes}</p>
                                        <p className="m-3 border-2 border-black p-1 ">Tags: {selectedImage.tags}</p>

                                    </div>

                                </div>
                            )}
                        </ReactModal>

                    </div>
            </div>
        </div>
    );
};

export default HomePage;

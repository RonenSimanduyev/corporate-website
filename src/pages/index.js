import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { TypeSelectionModal } from '../components/TypeSelectionModal';

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        handleModalClose();
        // Call server API or update state based on the selected type
        // You can add your logic here to fetch new data based on the selected type
    };

    const handlePrev = async () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            const response = await fetch(
                `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&page=${newPage}`
            );
            const data = await response.json();
            dispatch({ type: 'FETCH_PHOTOS', payload: data.hits.slice(0, 9) });
            setCurrentPage(newPage);
        }
    };

    const handleNext = async () => {
        const newPage = currentPage + 1;
        const response = await fetch(
            `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&page=${newPage}`
        );
        const data = await response.json();
        dispatch({ type: 'FETCH_PHOTOS', payload: data.hits.slice(0, 9) });
        setCurrentPage(newPage);
    };

    const dispatch = useDispatch();
    const photos = useSelector((state) => state.photos.photos);

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`
            );
            const data = await response.json();
            dispatch({ type: 'FETCH_PHOTOS', payload: data.hits.slice(0, 9) });
            setCurrentPage(1)
        };

        fetchData();
    }, [category]);

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
                onSelectType={handleTypeSelect}
                setCategory={setCategory}
            />

            <div className="text-white text-4xl text-center mt-8 mb-4">
                {category ? (
                    <div>
                        <h1>Category - {category}</h1>

                        <div className="grid grid-cols-3 gap-4">
                            {photos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className="                  m-5 flex items-center justify-center"
                                >
                                    <img
                                        className="max-w-full max-h-full cursor-pointer"
                                        src={photo.largeImageURL}
                                        alt={photo.title}
                                        onClick={() => handleImageSelect(photo)}
                                    />
                                </div>
                            ))}
                        </div>
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
                        <div className="h-[180px] text-center sticky">
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
                    </div>
                ) : (
                    <div>the category isn't selected, please choose one</div>
                )}
            </div>
        </div>
    );
};

export default HomePage;


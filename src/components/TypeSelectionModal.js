import React from 'react';
import ReactModal from 'react-modal';

export const TypeSelectionModal = ({ isOpen, onClose, setCategory }) => {
    const handleTypeSelect = (type) => {
        onClose();
        setCategory(type);
    };

    let categoriesList = ['animals', 'vacation', 'work'];

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Type Selection Modal">
            <div className="text-black">
                <h2 className="m-4">Select Type</h2>
                {categoriesList.map((category) => (
                    <button className="m-4 border-2 border-black p-3 w-20" key={category} onClick={() => handleTypeSelect(category)}>
                        {category}
                    </button>
                ))}
            </div>
        </ReactModal>
    );
};
